// import { useDispatch, useSelector } from "react-redux";
// import type { TypedUseSelectorHook } from "react-redux";
// // import type { RootState, AppDispatch } from './store';
// import type { RootState, AppDispatch } from "./index";

// // 在整个应用中使用这些类型化的 hooks，而不是普通的 useDispatch 和 useSelector
// export const useAppDispatch: () => AppDispatch = useDispatch;
// export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import type { RootState, AppDispatch } from './index';

// 在整个应用中使用，而不是直接使用 useDispatch 和 useSelector
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
