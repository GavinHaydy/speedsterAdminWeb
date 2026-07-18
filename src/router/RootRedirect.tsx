import { Navigate } from 'react-router-dom';

import { useAppSelector } from '@/store/hooks.ts';
import { selectIsAuthenticated } from '@/store/slices/userSlice.ts';

export function RootRedirect() {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  console.log('isAuthenticated:', isAuthenticated);

  return <Navigate to={isAuthenticated ? '/dashboard' : '/login'} replace />;
}
