// 由 scripts/generate-api.mjs 自动生成，请勿手动修改
// 来源: iam

import type {
  AccountLoginParams,
  AccountLoginResult,
  CreatePermissionParams,
  CreateRoleParams,
  DelRoleParams,
  GetRolePermissionsParams,
  GetRolePermissionsResult,
  PermissionListParams,
  PermissionListResult,
  RefreshParams,
  RefreshResult,
  RegisterParams,
  RegisterResult,
  RoleListParams,
  RoleListResult,
  StatusParams,
  UpdateRoleParams,
  UserListParams,
  UserListResult,
  UserPermissionResult,
} from '@/types/generated/iam';
import request from '@/utils/request';

/** 新增权限 */
export const createPermission = (values: CreatePermissionParams) => {
  return request.post<unknown>('/api/permission/createPermission', values);
};

/** 角色权限 */
export const getRolePermissions = (values: GetRolePermissionsParams) => {
  return request.post<GetRolePermissionsResult>('/api/permission/getRolePermissions', values);
};

/** 权限列表 */
export const permissionList = (values: PermissionListParams) => {
  return request.post<PermissionListResult>('/api/permission/permissionlist', values);
};

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

/** 登录 */
export const accountLogin = (values: AccountLoginParams) => {
  return request.post<AccountLoginResult>('/api/user/login', values, { _skipAuth: true });
};

/** 退出登录 */
export const accountLogout = () => {
  return request.delete<unknown>('/api/user/logout');
};

/** 刷新token */
export const refresh = (values: RefreshParams) => {
  return request.post<RefreshResult>('/api/user/refresh', values, { _skipAuth: true });
};

/** 注册 */
export const register = (values: RegisterParams) => {
  return request.post<RegisterResult>('/api/user/register', values, { _skipAuth: true });
};

/** 修改用户状态 */
export const status = (values: StatusParams) => {
  return request.put<unknown>('/api/user/status', values);
};

/** 用户信息 */
export const userInfo = () => {
  return request.get<unknown>('/api/user/userinfo');
};

/** 用户列表 */
export const userList = (values: UserListParams) => {
  return request.post<UserListResult>('/api/user/userlist', values);
};

/** 用户权限列表 */
export const userPermission = () => {
  return request.get<UserPermissionResult>('/api/user/userpermission');
};

/** 临时验证 */
export const verify = () => {
  return request.get<unknown>('/api/user/verify');
};
