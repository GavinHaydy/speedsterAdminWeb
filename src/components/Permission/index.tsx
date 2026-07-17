import type { PropsWithChildren } from 'react';

import { useAppSelector } from '@/store/hooks.ts';

interface PermissionProps extends PropsWithChildren {
  code: string;
}

export default function Permission({ code, children }: PermissionProps) {
  const { isAdmin, permissionCodes } = useAppSelector((state) => state.auth);

  if (isAdmin || permissionCodes.includes(code)) {
    return <>{children}</>;
  }

  return null;
}
