// 由 scripts/generate-api.mjs 自动生成，请勿手动修改
// 来源: iam

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
  code: string;
  createTime: string;
  desctiption: string;
  name: string;
  status: number;
  updateTime: string;
}

export interface UpdateRoleParams {
  code: string;
  description: string;
  id?: number;
  name: string;
  status: 1 | 2;
}

export interface AccountLoginParams {
  password: string;
  username: string;
}

export interface AccountLoginResult {
  accessToken: string;
  refreshToken: string;
  time: string;
}

export interface RefreshParams {
  refreshToken?: string;
}

export interface RefreshResult {
  accessToken: string;
  refreshToken: string;
  time: string;
}

export interface RegisterParams {
  email?: string;
  password: string;
  phone?: string;
  username: string;
}

export interface RegisterResult {
  userId: string;
}

export interface StatusParams {
  id?: string;
  status: 1 | 2;
}

export interface UserListParams {
  email?: string;
  nickname?: string;
  pageNo?: number;
  pageSize?: number;
  phone?: string;
  status?: number;
  username?: string;
}

export interface UserListResultItem {
  avatar: string;
  email: string;
  nickname: string;
  phone: string;
  status: number;
  username: string;
}

export interface UserListResult {
  list: UserListResultItem[];
  total: number;
}

export interface UserPermissionResultItemItemItem {
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

export interface UserPermissionResultItemItem {
  children: UserPermissionResultItemItemItem[];
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

export interface UserPermissionResultItem {
  children: UserPermissionResultItemItem[];
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

export interface UserPermissionResult {
  list: UserPermissionResultItem[];
  total: number;
}
