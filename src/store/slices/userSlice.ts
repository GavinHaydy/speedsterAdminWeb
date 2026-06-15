import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { AccountLoginResult } from '@/types/generated/user';
import { applyTokenPair, clearAuth, getToken, setToken as saveToken } from '@/utils/auth';

interface User {
  id: number;
  username: string;
  email: string;
  avatar?: string;
}

interface UserState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  token: getToken(),
  isAuthenticated: !!getToken(),
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
      state.token = action.payload.accessToken;
      state.isAuthenticated = true;
      applyTokenPair(action.payload);
    },
    setLoginError: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      saveToken(action.payload);
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      clearAuth();
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { setLoading, login, setLoginError, setUser, setToken, logout, clearError } =
  userSlice.actions;

// Selectors
export const selectUser = (state: { user: UserState }) => state.user.user;
export const selectIsAuthenticated = (state: { user: UserState }) => state.user.isAuthenticated;
export const selectUserLoading = (state: { user: UserState }) => state.user.loading;
export const selectUserError = (state: { user: UserState }) => state.user.error;

export default userSlice.reducer;
