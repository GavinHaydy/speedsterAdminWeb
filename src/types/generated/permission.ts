// 由 scripts/generate-api.mjs 自动生成，请勿手动修改
// 来源: permission

export interface GetRolePermissionsParams {
  roleId: number;
}

export interface GetRolePermissionsResult {
  permissionIds: number[];
}

export interface PermissionListParams {
  name?: string;
}

export interface PermissionListResultItemItemItem {
  children: Record<string, unknown>[];
  code: string;
  icon: string;
  id: number;
  method: string;
  name: string;
  parentId: number;
  path: string;
  sort: number;
  status: number;
  type: number;
}

export interface PermissionListResultItemItem {
  children: PermissionListResultItemItemItem[];
  code: string;
  icon: string;
  id: number;
  method: string;
  name: string;
  parentId: number;
  path: string;
  sort: number;
  status: number;
  type: number;
}

export interface PermissionListResultItem {
  children: PermissionListResultItemItem[];
  code: string;
  icon: string;
  id: number;
  method: string;
  name: string;
  parentId: number;
  path: string;
  sort: number;
  status: number;
  type: number;
}

export interface PermissionListResult {
  list: PermissionListResultItem[];
  total: number;
}
