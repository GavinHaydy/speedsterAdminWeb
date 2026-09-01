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
  UserInfoResult,
  UserListParams,
  UserListResult,
  UserPermissionResult,
} from '@/types/generated/iam';
import request from '@/utils/request';

/** 新增权限 */
export const createPermission = (values: CreatePermissionParams, showError?: boolean) => {
  return request.post<unknown>('/api/permission/createPermission', values, {
    showError: showError,
  });
};

/** 角色权限 */
export const getRolePermissions = (values: GetRolePermissionsParams, showError?: boolean) => {
  return request.post<GetRolePermissionsResult>('/api/permission/getRolePermissions', values, {
    showError: showError,
  });
};

/** 权限列表 */
export const permissionList = (values: PermissionListParams, showError?: boolean) => {
  return request.post<PermissionListResult>('/api/permission/permissionlist', values, {
    showError: showError,
  });
};

/** 新建角色 */
export const createRole = (values: CreateRoleParams, showError?: boolean) => {
  return request.post<unknown>('/api/role/create', values, { showError: showError });
};

/** 删除角色 */
export const delRole = (values: DelRoleParams, showError?: boolean) => {
  return request.delete<unknown>('/api/role/delete', { data: values, showError: showError });
};

/** 角色列表 */
export const roleList = (values: RoleListParams, showError?: boolean) => {
  return request.post<RoleListResult>('/api/role/rolelist', values, { showError: showError });
};

/** 修改角色 */
export const updateRole = (values: UpdateRoleParams, showError?: boolean) => {
  return request.put<unknown>('/api/role/update', values, { showError: showError });
};

/** 登录 */
export const accountLogin = (values: AccountLoginParams, showError?: boolean) => {
  return request.post<AccountLoginResult>('/api/user/login', values, {
    _skipAuth: true,
    showError: showError,
  });
};

/** 退出登录 */
export const accountLogout = (showError?: boolean) => {
  return request.delete<unknown>('/api/user/logout', { showError: showError });
};

/** 刷新token */
export const refresh = (values: RefreshParams, showError?: boolean) => {
  return request.post<RefreshResult>('/api/user/refresh', values, {
    _skipAuth: true,
    showError: showError,
  });
};

/** 注册 */
export const register = (values: RegisterParams, showError?: boolean) => {
  return request.post<RegisterResult>('/api/user/register', values, {
    _skipAuth: true,
    showError: showError,
  });
};

/** 修改用户状态 */
export const status = (values: StatusParams, showError?: boolean) => {
  return request.put<unknown>('/api/user/status', values, { showError: showError });
};

/** 用户信息 */
export const userInfo = () => {
  return request.get<UserInfoResult>('/api/user/userinfo');
};

/** 用户列表 */
export const userList = (values: UserListParams, showError?: boolean) => {
  return request.post<UserListResult>('/api/user/userlist', values, { showError: showError });
};

/** 用户权限列表 */
export const userPermission = () => {
  return request.get<UserPermissionResult>('/api/user/userpermission');
};

/** 临时验证 */
export const verify = () => {
  return request.get<unknown>('/api/user/verify');
};
