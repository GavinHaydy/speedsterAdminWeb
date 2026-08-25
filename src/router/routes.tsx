import { Navigate, type RouteObject } from 'react-router-dom';

import { GlobalLayout } from '@/layouts/MainLayout';
import DashboardPage from '@/pages/Dashboard';
import LoginPage from '@/pages/Login';
import { RoleManagement } from '@/pages/RoleManagement';
import UserManagement from '@/pages/UserManagement';
import { RootRedirect } from '@/router/RootRedirect.tsx';
// import MerchantPage from '@/pages/Merchant';
// import UserPage from '@/pages/User';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <RootRedirect />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/',
    element: <GlobalLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/dashboard" />,
      },
      {
        path: '/dashboard',
        element: <DashboardPage />,
      },
      {
        path: '/user',
        handle: {
          permission: 'user:menu',
        },
        element: <UserManagement />,
      },
      {
        path: '/role',
        handle: {
          permission: 'role:menu',
        },
        element: <RoleManagement />,
      },
    ],
  },
  // {
  //   path: '/merchant',
  //   permission: 'merchant:list',
  //   element: <MerchantPage />,
  // },
  // {
  //   path: '/user',
  //   permission: 'user:list',
  //   element: <UserPage />,
  // },
];
