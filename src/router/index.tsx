/* eslint-disable react-refresh/only-export-components */
// src/router/index.tsx
import { createBrowserRouter, Navigate } from 'react-router-dom';
// import MainLayout from '../layouts/MainLayout';
// import { LoginRoute } from './LoginRoute';
import { lazy, Suspense } from 'react';
import { Loading } from '../components';
// 懒加载页面（示例，启用时请在对应 *Route 组件里接入）:
// const Dashboard = lazy(() => import('../pages/Dashboard'));
// const UserManagement = lazy(() => import('../pages/UserManagement'));
// const NotFound = lazy(() => import('../pages/NotFound'));
const Login = lazy(() => import('../pages/Login'));

// 路由配置
export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/login" replace />,
  },
  {
    path: '/login',
    element: (
      <Suspense fallback={<Loading />}>
        <Login />
      </Suspense>
    ),
  },
  // {
  //   path: '/',
  //   element: (
  //     <RouteGuard>
  //       <MainLayout />
  //     </RouteGuard>
  //   ),
  //   children: [
  //     {
  //       index: true,
  //       element: <Navigate to="/dashboard" replace />,
  //     },
  //     {
  //       path: 'dashboard',
  //       element: (
  //         <Suspense fallback={<Loading />}>
  //           <Dashboard />
  //         </Suspense>
  //       ),
  //     },
  //     {
  //       path: 'users',
  //       element: (
  //         <Suspense fallback={<Loading />}>
  //           <UserManagement />
  //         </Suspense>
  //       ),
  //     },
  //     {
  //       path: '*',
  //       element: (
  //         <Suspense fallback={<Loading />}>
  //           <NotFound />
  //         </Suspense>
  //       ),
  //     },
  //   ],
  // },
]);
