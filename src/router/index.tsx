// /* eslint-disable react-refresh/only-export-components */
// import { lazy, Suspense } from 'react';
// import { createBrowserRouter, Navigate } from 'react-router-dom';
//
// import { Loading } from '@/components';
// import { GuestGuard, RouteGuard } from '@/components/RouteGuard';
// import { Permission } from '@/pages/Permission';
//
// const Login = lazy(() => import('@/pages/Login'));
// const MainLayout = lazy(() => import('@/layouts/MainLayout'));
// const Dashboard = lazy(() => import('@/pages/Dashboard'));
//
// export const router = createBrowserRouter([
//   {
//     path: '/login',
//     element: (
//       <GuestGuard>
//         <Suspense fallback={<Loading />}>
//           <Login />
//         </Suspense>
//       </GuestGuard>
//     ),
//   },
//   {
//     path: '/',
//     element: (
//       <RouteGuard>
//         <Suspense fallback={<Loading />}>
//           <MainLayout />
//         </Suspense>
//       </RouteGuard>
//     ),
//     children: [
//       {
//         index: true,
//         element: <Navigate to="/dashboard" replace />,
//       },
//       {
//         path: 'dashboard',
//         element: (
//           <Suspense fallback={<Loading />}>
//             <Dashboard />
//           </Suspense>
//         ),
//       },
//       {
//         path: 'permission',
//         element: <Permission />,
//       },
//     ],
//   },
//   {
//     path: '*',
//     element: <Navigate to="/dashboard" replace />,
//   },
// ]);

import { createBrowserRouter } from 'react-router-dom';

import AuthGuard from './AuthGuard';
import PermissionGuard from './PermissionGuard';
import { routes } from './routes';

const routerConfig = routes.map((route) => {
  if (route.path === '/login') {
    return route;
  }

  return {
    ...route,
    element: (
      <AuthGuard>
        {route.permission ? (
          <PermissionGuard permission={route.permission}>{route.element}</PermissionGuard>
        ) : (
          route.element
        )}
      </AuthGuard>
    ),
  };
});

export const router = createBrowserRouter(routerConfig);
