import { Navigate } from 'react-router-dom';

import { GlobalLayout } from '@/layouts/MainLayout';
import DashboardPage from '@/pages/Dashboard';
import LoginPage from '@/pages/Login';
import UserManagement from '@/pages/UserManagement';
import { RootRedirect } from '@/router/RootRedirect.tsx';
// import MerchantPage from '@/pages/Merchant';
// import UserPage from '@/pages/User';

export const routes = [
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
        permission: '',
        element: <DashboardPage />,
      },
      {
        path: '/user',
        permission: 'user:menu',
        element: <UserManagement />,
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
