// 由 scripts/generate-api.mjs 自动生成，请勿手动修改
// 来源: permission

import type {
  GetRolePermissionsParams,
  GetRolePermissionsResult,
  PermissionListParams,
  PermissionListResult,
} from '@/types/generated/permission';
import request from '@/utils/request';

/** 角色权限 */
export const getRolePermissions = (values: GetRolePermissionsParams) => {
  return request.post<GetRolePermissionsResult>('/api/permission/getRolePermissions', values);
};

/** 权限列表 */
export const permissionList = (values: PermissionListParams) => {
  return request.post<PermissionListResult>('/api/permission/permissionlist', values);
};
