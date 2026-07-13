import { useEffect, useState } from 'react';

import { Tree, type TreeDataNode, type TreeProps } from 'antd';

import { permissionList } from '@/api/generated';
import type { PermissionListResult } from '@/types/generated';

export const Permission = () => {
  const [permissions, setPermissions] = useState<PermissionListResult>({
    is_admin: false,
    list: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      const res = await permissionList({ name: '' });
      setPermissions(res);
    };
    fetchData().then();
  }, []);

  const onSelect: TreeProps['onSelect'] = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info);
  };

  const onCheck: TreeProps['onCheck'] = (checkedKeys, info) => {
    console.log('onCheck', checkedKeys, info);
  };

  return (
    <Tree
      checkable
      onSelect={onSelect}
      onCheck={onCheck}
      fieldNames={{
        title: 'name',
        key: 'id',
        children: 'children',
      }}
      disabled={true}
      treeData={permissions.list as unknown as TreeDataNode[]}
    />
  );
};
