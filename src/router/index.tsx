// src/router/index.tsx
import { createBrowserRouter, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import { Spin } from "antd";
// import MainLayout from '../layouts/MainLayout';

// 懒加载页面组件
const Login = lazy(() => import("../pages/Login"));
// const Dashboard = lazy(() => import('../pages/Dashboard'));
// const UserManagement = lazy(() => import('../pages/UserManagement'));
// const NotFound = lazy(() => import('../pages/NotFound'));

// 加载中组件
const LoadingFallback = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
    }}
  >
    <Spin size="large" />
  </div>
);

// 路由守卫组件
const RouteGuard = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

// 路由配置
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },
  {
    path: "/login",
    element: (
      <Suspense fallback={<LoadingFallback />}>
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
  //         <Suspense fallback={<LoadingFallback />}>
  //           <Dashboard />
  //         </Suspense>
  //       ),
  //     },
  //     {
  //       path: 'users',
  //       element: (
  //         <Suspense fallback={<LoadingFallback />}>
  //           <UserManagement />
  //         </Suspense>
  //       ),
  //     },
  //     {
  //       path: '*',
  //       element: (
  //         <Suspense fallback={<LoadingFallback />}>
  //           <NotFound />
  //         </Suspense>
  //       ),
  //     },
  //   ],
  // },
]);
