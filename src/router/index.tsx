/* eslint-disable react-refresh/only-export-components */
import { lazy, Suspense } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';

import { Loading } from '@/components';
import { GuestGuard, RouteGuard } from '@/components/RouteGuard';
import { Permission } from '@/pages/Permission';

const Login = lazy(() => import('@/pages/Login'));
const MainLayout = lazy(() => import('@/layouts/MainLayout'));
const Dashboard = lazy(() => import('@/pages/Dashboard'));
const UserManagement = lazy(() => import('@/pages/UserManagement'));
export const router = createBrowserRouter([
  {
    path: '/login',
    element: (
      <GuestGuard>
        <Suspense fallback={<Loading />}>
          <Login />
        </Suspense>
      </GuestGuard>
    ),
  },
  {
    path: '/',
    element: (
      <RouteGuard>
        <Suspense fallback={<Loading />}>
          <MainLayout />
        </Suspense>
      </RouteGuard>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="/dashboard" replace />,
      },
      {
        path: 'dashboard',
        element: (
          <Suspense fallback={<Loading />}>
            <Dashboard />
          </Suspense>
        ),
      },
      {
        path: 'users',
        element: (
          <Suspense fallback={<Loading />}>
            <UserManagement />
          </Suspense>
        ),
      },
      {
        path: 'permission',
        element: <Permission />,
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/dashboard" replace />,
  },
]);
