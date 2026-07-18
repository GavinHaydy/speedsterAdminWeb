import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';

import lang from '@/store/lang.ts';
import { configGenerator } from '@/store/persistPlugin.ts';

import userReducer from './slices/userSlice';

// 包装各个 reducer
const rootReducer = combineReducers({
  auth: persistReducer(configGenerator('auth'), userReducer),
  // theme: persistReducer(configGenerator('theme'), themeReducer),
  lang: persistReducer(configGenerator('lang'), lang),
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: import.meta.env.NODE_ENV !== 'production',
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
