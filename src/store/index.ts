import { configureStore, combineReducers } from "@reduxjs/toolkit";

// 临时占位 reducer
const counterReducer = (state = { value: 0 }) => state;
const userReducer = (state = { user: null, token: null }) => state;

const rootReducer = combineReducers({
  counter: counterReducer,
  user: userReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: import.meta.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// 不需要导出 persistor
