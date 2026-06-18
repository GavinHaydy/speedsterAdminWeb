import { useEffect, useState } from 'react';

import { permissionList } from '@/api/generated';
import type { PermissionListResult } from '@/types/generated';

export const Permission = () => {
  const [permissions, setPermissions] = useState<PermissionListResult>({ total: 0, list: [] });

  useEffect(() => {
    const fetchPermissions = async () => {
      try {
        const res = await permissionList({ name: '' });
        setPermissions(res);
      } catch (error) {
        console.error('获取权限列表失败:', error);
      }
    };

    fetchPermissions().then();
  }, []);
  return <div>{permissions.list.map((item) => item.name)}</div>;
};
