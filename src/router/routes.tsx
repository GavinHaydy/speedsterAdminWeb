import DashboardPage from '@/pages/Dashboard';
import LoginPage from '@/pages/Login';
// import MerchantPage from '@/pages/Merchant';
// import UserPage from '@/pages/User';

export const routes = [
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/dashboard',
    permission: '',
    element: <DashboardPage />,
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
