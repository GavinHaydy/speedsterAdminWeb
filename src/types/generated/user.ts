// 由 scripts/generate-api.mjs 自动生成，请勿手动修改
// 来源: user

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
