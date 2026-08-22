/** @type {import('./generate-api.mjs').ApiGenConfig} */
export default {
  // baseUrl: 'http://47.108.58.56:9527',
  baseUrl: 'http://localhost:9527',
  docsPage: '/docs',
  sources: [],
  output: {
    typesDir: 'src/types/generated',
    apiDir: 'src/api/generated',
  },
  apiPrefix: '/api',
  fieldCase: 'preserve',
  skipAuthHeuristics: true,
  /** 额外免鉴权路径，作为自动检测之外的补充 */
  skipAuthPaths: [],
};
