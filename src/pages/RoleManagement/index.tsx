import { useEffect, useState } from 'react';

import { Button, Form, Input, message, Popconfirm, Select, Space } from 'antd';

import { roleList } from '@/api/generated';
import CrudTable from '@/components/ListComponent';
import type { RoleListParams, RoleListResult, RoleListResultItem } from '@/types/generated';

// export const RoleManagement: React.FC = () => {
//   const [searchForm] = Form.useForm();
//   const [searchValue, setSearchValue] = useState<RoleListParams>({pageSize:10, pageNo: 1});
//   const [roleListValue, setRoleListValur] = useState<RoleListResult>();
//
//   useEffect(() => {
//     roleList(searchValue).then(r => {
//       if (r){
//         setRoleListValur(r)
//       }
//     })
//   }, [searchValue])
//
//   const columns: TableProps<RoleListResultItem>['columns'] = [
//     {title: '角色名', dataIndex: 'name', key: 'name'},
//     {title: '角色码', dataIndex: 'code', key: 'code'},
//     {title: '备注',   dataIndex: 'description', key: 'description'},
//     {title: '状态', dataIndex: 'status', key: 'status'},
//     {title: '创建时间', dataIndex: 'create_time', key: 'create_time'},
//     {title: '更新时间', dataIndex: 'update_time', key: 'update_time'},
//   ]
//
//   return (
//     <>
//       <Card>
//         <Form
//           form={searchForm}
//           layout="inline"
//           style={{
//             display: 'flex',
//             flexWrap: 'wrap',
//             gap: 16,
//           }}
//         >
//           <Form.Item<RoleListParams> name="rolename" label="角色名">
//             <Input allowClear />
//           </Form.Item>
//
//           <Form.Item<RoleListParams> name="code" label="角色编码">
//             <Input allowClear />
//           </Form.Item>
//
//           <Form.Item<RoleListParams> name="status" label="状态">
//             <Input allowClear />
//           </Form.Item>
//         </Form>
//       </Card>
//
//       <Card style={{ marginTop: 16 }}>
//         <Space>
//           <Button type="primary" >
//             新增
//           </Button>
//
//           <Button
//             danger
//           >
//             批量删除
//           </Button>
//
//           <Button>
//             刷新
//           </Button>
//         </Space>
//       </Card>
//
//       <Card style={{ marginTop: 16 }}>
//         <Table
//           rowKey="code"
//           dataSource={roleListValue?.list}
//           columns={columns}
//         ></Table>
//       </Card>
//     </>
//   );
// };

export const RoleManagement = () => {
  const [searchForm] = Form.useForm<RoleListParams>();
  const [search, setSearch] = useState<RoleListParams>({ pageNo: 1, pageSize: 10, status: 0 });
  const [roleListValue, setRoleListValue] = useState<RoleListResult>();

  const [loading, setLoading] = useState(false);

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  /**
   * 查询角色列表
   */
  const getRoleList = (params: RoleListParams) => {
    try {
      setLoading(true);

      roleList(params).then((res) => {
        setRoleListValue(res);
      });

      setSelectedRowKeys([]);
    } finally {
      setLoading(false);
    }
  };

  /**
   * 搜索
   */
  const handleSearch = () => {
    const values = searchForm.getFieldsValue();
    setSearch({ ...search, ...values });
    // void getRoleList({ ...search,...values });
  };

  /**
   * 重置
   */
  const handleReset = () => {
    searchForm.resetFields();
    setSearch({ pageNo: 1, pageSize: 10, status: 0 });

    void getRoleList(search);
  };

  /**
   * 新增
   */
  const handleCreate = () => {
    console.log('新增角色');
  };

  /**
   * 删除
   */
  const handleDelete = async (code: string) => {
    console.log('删除角色:', code);

    message.success('删除成功');
  };

  /**
   * 批量删除
   */
  const handleBatchDelete = async () => {
    console.log('批量删除:', selectedRowKeys);

    message.success('删除成功');

    setSelectedRowKeys([]);
  };

  /**
   * 刷新
   */
  const handleRefresh = () => {
    void getRoleList(searchForm.getFieldsValue());
  };

  /**
   * Table Columns
   */
  const columns = [
    {
      title: '角色名',
      dataIndex: 'name',
    },
    {
      title: '角色编码',
      dataIndex: 'code',
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: (status: number) => (status === 1 ? '正常' : '禁用'),
    },
    {
      title: '说明',
      dataIndex: 'description',
    },
    {
      title: '创建时间',
      dataIndex: 'create_time',
    },
    {
      title: '更新时间',
      dataIndex: 'update_time',
    },
    {
      title: '操作',
      render: (_: unknown, record: RoleListResultItem) => (
        <Space>
          <Button type="link">编辑</Button>

          <Popconfirm title="确定删除这个角色吗？" onConfirm={() => handleDelete(record.code)}>
            <Button type="link" danger>
              删除
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  /**
   * 初始化
   */
  useEffect(() => {
    void getRoleList(search);
  }, [search]);

  return (
    <CrudTable<RoleListResultItem>
      search={
        <Form
          form={searchForm}
          layout="inline"
          onFinish={handleSearch}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 16,
          }}
        >
          <Form.Item<RoleListParams> name="rolename" label="角色名">
            <Input allowClear />
          </Form.Item>

          <Form.Item<RoleListParams> name="code" label="角色编码">
            <Input allowClear />
          </Form.Item>

          <Form.Item<RoleListParams> name="status" label="状态">
            <Select
              options={[
                { value: 0, label: '所有' },
                { value: 1, label: '启用' },
                { value: 2, label: '禁用' },
              ]}
              defaultValue={0}
            ></Select>
          </Form.Item>

          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                搜索
              </Button>

              <Button onClick={handleReset}>重置</Button>
            </Space>
          </Form.Item>
        </Form>
      }
      actions={
        <>
          <Button type="primary" onClick={handleCreate}>
            新增
          </Button>

          <Button danger disabled={selectedRowKeys.length === 0} onClick={handleBatchDelete}>
            批量删除
          </Button>

          <Button onClick={handleRefresh}>刷新</Button>
        </>
      }
      rowKey="code"
      dataSource={roleListValue?.list}
      columns={columns}
      loading={loading}
      rowSelection={{
        selectedRowKeys,
        onChange: setSelectedRowKeys,
      }}
      pagination={{
        current: search.pageNo,
        pageSize: search.pageSize,
        showSizeChanger: true,
        total: roleListValue?.total ?? 0,
        showTotal: (total) => `共 ${total} 条`,
        onChange: (newPageNo, newPageSize) => {
          const val = searchForm.getFieldsValue();
          setSearch({ ...search, ...val, pageNo: newPageNo, pageSize: newPageSize });
        },
      }}
    />
  );
};
