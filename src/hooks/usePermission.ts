import { useMemo } from 'react';

import { useAppSelector } from '@/store/hooks';

export const usePermission = (code: string): boolean => {
  const { isAdmin, permissionCodes } = useAppSelector((state) => state.auth);

  const permissionSet = useMemo(() => new Set(permissionCodes), [permissionCodes]);

  return isAdmin || permissionSet.has(code);
};

// const canCreate = usePermission('merchant:create');
//
// if (canCreate) {
// ...
// }
