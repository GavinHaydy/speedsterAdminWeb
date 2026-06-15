// 由 scripts/generate-api.mjs 自动生成，请勿手动修改
// 来源: user

import type {
  AccountLoginParams,
  AccountLoginResult,
  RefreshParams,
  RefreshResult,
  RegisterParams,
  RegisterResult,
  StatusParams,
  UserListParams,
  UserListResult,
} from '@/types/generated/user';
import request from '@/utils/request';

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

/** 用户列表 */
export const userList = (values: UserListParams) => {
  return request.post<UserListResult>('/api/user/userlist', values);
};
