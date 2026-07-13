import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '@/store';
import type { UserPermissionResult } from '@/types/generated';
import type { AccountLoginResult } from '@/types/generated/iam';
import { getToken } from '@/utils/auth';

interface User {
  id: number;
  nickname: string;
}

interface UserState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  isAuthenticated: !!getToken(),
  isAdmin: false,
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
    setIsAdmin: (state, action: PayloadAction<UserPermissionResult>) => {
      state.isAdmin = action.payload.is_admin;
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
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  setLoading,
  login,
  setIsAdmin,
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
export const selectIsAdmin = (state: RootState) => state.auth.isAdmin;
export const selectUserLoading = (state: RootState) => state.auth.loading;
export const selectLoginError = (state: RootState) => state.auth.error;

export default userSlice.reducer;
