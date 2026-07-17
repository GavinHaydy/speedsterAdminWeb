import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '@/store';
import type { UserPermissionResult, UserPermissionResultItem } from '@/types/generated';
import type { AccountLoginResult } from '@/types/generated/iam';
// import { getToken } from '@/utils/auth';

interface User {
  id: string;
  nickname: string;
}

interface UserState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  permissions: UserPermissionResultItem[];
  permissionCodes: string[];
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
  isAdmin: false,
  permissions: [],
  permissionCodes: [],
  loading: false,
  error: null,
};

// 登录成功后写入 token
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    login: (state, action: PayloadAction<AccountLoginResult>) => {
      state.loading = false;
      state.error = null;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.isAuthenticated = true;
    },
    setLoginError: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    setPermissions: (state, action: PayloadAction<UserPermissionResult>) => {
      state.isAdmin = action.payload.is_admin;
      state.permissions = action.payload.list;
      state.permissionCodes = action.payload.codes;
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    setToken: (state, action: PayloadAction<AccountLoginResult>) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      state.isAdmin = false;
      state.permissions = [];
      state.permissionCodes = [];
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  setLoading,
  login,
  setPermissions,
  setUser,
  setToken,
  setLoginError,
  logout,
  clearError,
} = userSlice.actions;

// Selectors
export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectAccessToken = (state: RootState) => state.auth.accessToken;
export const selectRefreshToken = (state: RootState) => state.auth.refreshToken;
export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;
export const selectUserPermissions = (state: RootState) => state.auth.permissions;
export const selectUserLoading = (state: RootState) => state.auth.loading;
export const selectLoginError = (state: RootState) => state.auth.error;

export default userSlice.reducer;
