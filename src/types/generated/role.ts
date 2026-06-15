// 由 scripts/generate-api.mjs 自动生成，请勿手动修改
// 来源: role

export interface CreateRoleParams {
  code?: string;
  description: string;
  name?: string;
}

export interface DelRoleParams {
  id?: number;
}

export interface RoleListParams {
  code?: string;
  pageNo?: number;
  pageSize?: number;
  rolename?: string;
  status?: number;
}

export interface RoleListResult {
  Code?: string;
  CreateTime?: string;
  Desctiption?: string;
  Name?: string;
  Status?: number;
  UpdateTime?: string;
}

export interface UpdateRoleParams {
  code: string;
  description: string;
  id?: number;
  name: string;
  status: 1 | 2;
}
