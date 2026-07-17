import * as React from 'react';
import { Navigate } from 'react-router-dom';

import { usePermission } from '@/hooks/usePermission';

interface Props {
  permission: string;
  children: React.ReactNode;
}

export default function PermissionGuard({ permission, children }: Props) {
  const hasPermission = usePermission(permission);

  if (!hasPermission) {
    return <Navigate to="/403" replace />;
  }

  return <>{children}</>;
}
