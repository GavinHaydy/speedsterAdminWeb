import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import config from './api-gen.config.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

/** @typedef {{ name: string; url: string }} ApiSource */
/** @typedef {{ typesDir: string; apiDir: string }} ApiOutput */
/**
 * @typedef {Object} ApiGenConfig
 * @property {string} baseUrl
 * @property {string} [docsPage]
 * @property {ApiSource[]} [sources]
 * @property {ApiOutput} output
 * @property {string} apiPrefix
 * @property {'camel' | 'preserve'} fieldCase
 * @property {boolean} [skipAuthHeuristics]
 * @property {string[]} [skipAuthPaths]
 */

const HTTP_METHODS = ['get', 'post', 'put', 'delete', 'patch'];
const PUBLIC_PATH_HEURISTIC = /\/(login|refresh|register|signup)(\/|$)/i;

const updateName = (operation) => {
  console.log("============",operation);
  if (operation?.["tags"]) {
    const groupName = operation?.["tags"][0].split("-")[0].toLowerCase();
    return  operation.operationId.startsWith(groupName)
      ? toCamelCase(operation.operationId.slice(groupName.length))
      : toCamelCase(operation.operationId);
  }
  return toCamelCase(operation.operationId);

}

const toPascalCase = (value) =>
  value
    .replace(/[^a-zA-Z0-9]+/g, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');

const toCamelCase = (value) => {
  const pascal = toPascalCase(value);
  return pascal.charAt(0).toLowerCase() + pascal.slice(1);
};

const convertFieldName = (name) => {
  if (config.fieldCase !== 'camel' || !name.includes('_')) {
    return name;
  }
  return name.replace(/_([a-z])/g, (_, char) => char.toUpperCase());
};

const swaggerTypeToTs = (schema) => {
  if (!schema) return 'unknown';

  if (schema.$ref) {
    const refName = schema.$ref.split('/').pop() ?? 'Unknown';
    return toPascalCase(refName);
  }

  if (schema.enum?.length) {
    const isNumberEnum = schema.type === 'integer' || schema.type === 'number';
    return schema.enum
      .map((item) => (isNumberEnum ? Number(item) : JSON.stringify(item)))
      .join(' | ');
  }

  switch (schema.type) {
    case 'string':
      return 'string';
    case 'integer':
    case 'number':
      return 'number';
    case 'boolean':
      return 'boolean';
    case 'array':
      return `${swaggerTypeToTs(schema.items)}[]`;
    case 'object':
      return 'Record<string, unknown>';
    default:
      return 'unknown';
  }
};

const isEmptyDataSchema = (schema) => {
  if (!schema) return true;
  if (Object.keys(schema).length === 0) return true;
  if (!schema.type && !schema.properties && !schema.$ref) return true;
  if (
    schema.type === 'object' &&
    (!schema.properties || Object.keys(schema.properties).length === 0)
  ) {
    return true;
  }
  return false;
};

class TypeCollector {
  constructor() {
    /** @type {Map<string, string>} */
    this.types = new Map();
  }

  /**
   * @param {string} typeName
   * @param {Record<string, unknown>} schema
   */
  collect(typeName, schema) {
    if (!schema || schema.type !== 'object' || !schema.properties) {
      return swaggerTypeToTs(schema);
    }

    if (this.types.has(typeName)) {
      return typeName;
    }

    const required = new Set(schema.required ?? []);
    const nestedFields = [];

    for (const [rawName, propSchema] of Object.entries(schema.properties)) {
      const fieldName = convertFieldName(rawName);
      const optional = required.has(rawName) ? '' : '?';
      let fieldType = swaggerTypeToTs(propSchema);

      if (propSchema?.type === 'object' && propSchema.properties) {
        const nestedTypeName = `${typeName}${toPascalCase(rawName)}`;
        fieldType = this.collect(nestedTypeName, propSchema);
      } else if (
        propSchema?.type === 'array' &&
        propSchema.items?.type === 'object' &&
        propSchema.items.properties
      ) {
        const itemTypeName = `${typeName}Item`;
        fieldType = `${this.collect(itemTypeName, propSchema.items)}[]`;
      }

      nestedFields.push(`  ${fieldName}${optional}: ${fieldType};`);
    }

    this.types.set(typeName, nestedFields.join('\n'));
    return typeName;
  }

  render() {
    return [...this.types.entries()]
      .map(([name, body]) => `export interface ${name} {\n${body}\n}`)
      .join('\n\n');
  }
}

/**
 * @param {string} url
 */
const fetchText = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`请求失败: ${url} (${response.status})`);
  }
  return response.text();
};

/**
 * @param {string} specUrl
 */
const fetchSpec = async (specUrl) => {
  const response = await fetch(specUrl);
  if (!response.ok) {
    throw new Error(`拉取规范失败: ${specUrl} (${response.status})`);
  }
  return response.json();
};

/**
 * @param {string} baseUrl
 * @param {string} docsPage
 * @returns {Promise<ApiSource[]>}
 */
const discoverSources = async (baseUrl, docsPage) => {
  const docsUrl = new URL(docsPage, baseUrl).toString();
  const html = await fetchText(docsUrl);
  const sources = [];
  const seen = new Set();
  const urlPattern = /url:\s*['"]([^'"]+\.json)['"]/gi;

  for (const match of html.matchAll(urlPattern)) {
    const url = match[1];
    if (seen.has(url)) continue;
    seen.add(url);

    const filename = path.basename(url, '.json');
    const name = filename.replace(/[^a-zA-Z0-9]/g, '').toLowerCase() || filename;
    sources.push({ name, url });
  }

  if (sources.length === 0) {
    throw new Error(
      `未能从 ${docsUrl} 自动发现 API 规范，请在 api-gen.config.mjs 中手动配置 sources`,
    );
  }

  return sources;
};

/**
 * @returns {Promise<ApiSource[]>}
 */
const resolveSources = async () => {
  if (config.sources?.length) {
    console.log('使用配置中的 sources');
    return config.sources;
  }

  const docsPage = config.docsPage ?? '/docs';
  console.log(`自动发现 sources（${docsPage}）...`);
  const sources = await discoverSources(config.baseUrl, docsPage);
  console.log(`  发现 ${sources.length} 个服务: ${sources.map((item) => item.name).join(', ')}`);
  return sources;
};

/**
 * @param {Record<string, unknown>} operation
 * @param {Record<string, unknown>} spec
 * @returns {boolean | null} true=需鉴权, false=免鉴权, null=规范未标注
 */
const needsAuthBySwagger = (operation, spec) => {
  const opSecurity = operation.security;
  const globalSecurity = spec.security;

  if (Array.isArray(opSecurity) && opSecurity.length === 0) {
    return false;
  }

  if (Array.isArray(opSecurity) && opSecurity.length > 0) {
    return true;
  }

  if (opSecurity === undefined && Array.isArray(globalSecurity) && globalSecurity.length > 0) {
    return true;
  }

  return null;
};

/**
 * @param {string} routePath
 * @param {Record<string, unknown>} operation
 * @param {Record<string, unknown>} spec
 */
const resolveSkipAuth = (routePath, operation, spec) => {
  if (config.skipAuthPaths?.includes(routePath)) {
    return { skipAuth: true, reason: 'config' };
  }

  const swaggerAuth = needsAuthBySwagger(operation, spec);
  if (swaggerAuth === false) {
    return { skipAuth: true, reason: 'swagger' };
  }
  if (swaggerAuth === true) {
    return { skipAuth: false, reason: 'swagger' };
  }

  if (config.skipAuthHeuristics !== false && PUBLIC_PATH_HEURISTIC.test(routePath)) {
    return { skipAuth: true, reason: 'heuristic' };
  }

  return { skipAuth: false, reason: 'default' };
};

/**
 * @param {Record<string, unknown>} spec
 * @param {string} sourceName
 */
const parseOperations = (spec, sourceName) => {
  /** @type {Array<Record<string, unknown>>} */
  const operations = [];

  for (const [routePath, methods] of Object.entries(spec.paths ?? {})) {
    for (const method of HTTP_METHODS) {
      const operation = methods?.[method];


      if (!operation) continue;
      const [groupName, up] = updateName(operation)

      const bodyParam = operation.parameters?.find((item) => item.in === 'body');
      const responseSchema = operation.responses?.['200']?.schema;
      const dataSchema = responseSchema?.properties?.data;
      const { skipAuth, reason } = resolveSkipAuth(routePath, operation, spec);

      operations.push({
        sourceName,
        method: method.toUpperCase(),
        path: routePath,
        summary: operation.summary ?? '',
        operationId: updateName(operation) ?? toCamelCase(`${method}_${routePath}`),
        bodySchema: bodyParam?.schema ?? null,
        dataSchema: isEmptyDataSchema(dataSchema) ? null : dataSchema,
        skipAuth,
        skipAuthReason: reason,
      });
    }
  }

  return operations;
};

/**
 * @param {Array<Record<string, unknown>>} operations
 */
const generateTypesFile = (operations, sourceName) => {
  const collector = new TypeCollector();

  for (const operation of operations) {
    const baseName = toPascalCase(updateName(operation));

    if (operation.bodySchema) {
      collector.collect(`${baseName}Params`, operation.bodySchema);
    }

    if (operation.dataSchema) {
      collector.collect(`${baseName}Result`, operation.dataSchema);
    }
  }

  const body = collector.render();
  const header = `// 由 scripts/generate-api.mjs 自动生成，请勿手动修改\n// 来源: ${sourceName}\n\n`;

  return body ? `${header}${body}\n` : `${header}// 无可生成类型\n`;
};

/**
 * @param {Array<Record<string, unknown>>} operations
 */
const generateApiFile = (operations, sourceName) => {
  const typeImports = new Set();
  const functions = [];

  for (const operation of operations) {
    const baseName = toPascalCase(updateName(operation));
    const paramsType = operation.bodySchema ? `${baseName}Params` : null;
    const resultType = operation.dataSchema ? `${baseName}Result` : 'unknown';
    const apiPath = `${config.apiPrefix}${operation.path}`;
    const needsSkipAuth = operation.skipAuth === true;

    if (paramsType) typeImports.add(paramsType);
    if (operation.dataSchema) typeImports.add(`${baseName}Result`);

    const configItems = [];
    if (needsSkipAuth) configItems.push('_skipAuth: true');

    const configArg = configItems.length > 0 ? `, { ${configItems.join(', ')} }` : '';

    const summary = operation.summary ? `/** ${operation.summary} */\n` : '';
    const fnName = updateName(operation);

    let fnBody = '';

    switch (operation.method) {
      case 'GET':
        fnBody = paramsType
          ? `export const ${fnName} = (params: ${paramsType}) => {\n  return request.get<${resultType}>('${apiPath}', { params${needsSkipAuth ? ', _skipAuth: true' : ''} });\n};`
          : `export const ${fnName} = () => {\n  return request.get<${resultType}>('${apiPath}'${configArg});\n};`;
        break;
      case 'POST':
        fnBody = paramsType
          ? `export const ${fnName} = (values: ${paramsType}) => {\n  return request.post<${resultType}>('${apiPath}', values${configArg});\n};`
          : `export const ${fnName} = () => {\n  return request.post<${resultType}>('${apiPath}'${configArg});\n};`;
        break;
      case 'PUT':
        fnBody = paramsType
          ? `export const ${fnName} = (values: ${paramsType}) => {\n  return request.put<${resultType}>('${apiPath}', values${configArg});\n};`
          : `export const ${fnName} = () => {\n  return request.put<${resultType}>('${apiPath}'${configArg});\n};`;
        break;
      case 'DELETE':
        fnBody = paramsType
          ? `export const ${fnName} = (values: ${paramsType}) => {\n  return request.delete<${resultType}>('${apiPath}', { data: values${needsSkipAuth ? ', _skipAuth: true' : ''} });\n};`
          : `export const ${fnName} = () => {\n  return request.delete<${resultType}>('${apiPath}'${configArg});\n};`;
        break;
      default:
        fnBody = `// 未支持的方法: ${operation.method} ${operation.path}`;
    }

    functions.push(`${summary}${fnBody}`);
  }

  const importTypes = [...typeImports].sort().join(', ');
  const typeImportLine = importTypes
    ? `import type { ${importTypes} } from '@/types/generated/${sourceName}';\n`
    : '';

  return `// 由 scripts/generate-api.mjs 自动生成，请勿手动修改
// 来源: ${sourceName}

${typeImportLine}import request from '@/utils/request';\n\n
${functions.join('\n\n')}
`;
};

const ensureDir = (dirPath) => {
  fs.mkdirSync(dirPath, { recursive: true });
};

const writeFile = (filePath, content) => {
  ensureDir(path.dirname(filePath));
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`✓ ${path.relative(rootDir, filePath)}`);
};

const main = async () => {
  console.log('开始生成 API 代码...\n');

  const sources = await resolveSources();
  sources.sort((a, b) => a.name.localeCompare(b.name));

  console.log(sources);
  console.log('');

  /** @type {string[]} */
  const skipAuthLogs = [];

  for (const source of sources) {
    const specUrl = new URL(source.url, config.baseUrl).toString();
    console.log(`拉取 ${source.name}: ${specUrl}`);

    const spec = await fetchSpec(specUrl);
    const operations = parseOperations(spec, source.name);

    for (const operation of operations) {
      if (operation.skipAuth) {
        skipAuthLogs.push(`${operation.method} ${operation.path} (${operation.skipAuthReason})`);
      }
    }

    const typesContent = generateTypesFile(operations, source.name);
    const apiContent = generateApiFile(operations, source.name);

    writeFile(path.join(rootDir, config.output.typesDir, `${source.name}.ts`), typesContent);
    writeFile(path.join(rootDir, config.output.apiDir, `${source.name}.ts`), apiContent);

    console.log(`  接口数: ${operations.length}\n`);
  }

  if (skipAuthLogs.length > 0) {
    console.log('免鉴权接口:');
    for (const log of skipAuthLogs) {
      console.log(`  - ${log}`);
    }
    console.log('');
  }

  const indexTypes = sources.map((source) => `export * from './${source.name}';`).join('\n');
  const indexApi = sources.map((source) => `export * from './${source.name}';`).join('\n');

  writeFile(
    path.join(rootDir, config.output.typesDir, 'index.ts'),
    `// 由 scripts/generate-api.mjs 自动生成，请勿手动修改\n\n${indexTypes}\n`,
  );
  writeFile(
    path.join(rootDir, config.output.apiDir, 'index.ts'),
    `// 由 scripts/generate-api.mjs 自动生成，请勿手动修改\n\n${indexApi}\n`,
  );

  console.log('生成完成。运行 pnpm gen:api 可重新生成。');
};

main().catch((error) => {
  console.error('生成失败:', error.message);
  process.exit(1);
});
