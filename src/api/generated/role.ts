// 由 scripts/generate-api.mjs 自动生成，请勿手动修改
// 来源: role

import type {
  CreateRoleParams,
  DelRoleParams,
  RoleListParams,
  RoleListResult,
  UpdateRoleParams,
} from '@/types/generated/role';
import request from '@/utils/request';

/** 新建角色 */
export const createRole = (values: CreateRoleParams) => {
  return request.post<unknown>('/api/role/create', values);
};

/** 删除角色 */
export const delRole = (values: DelRoleParams) => {
  return request.delete<unknown>('/api/role/delete', { data: values });
};

/** 角色列表 */
export const roleList = (values: RoleListParams) => {
  return request.post<RoleListResult>('/api/role/rolelist', values);
};

/** 修改角色 */
export const updateRole = (values: UpdateRoleParams) => {
  return request.put<unknown>('/api/role/update', values);
};
