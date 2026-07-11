import { Avatar, Button, Form, Input, message, Popconfirm, Select, Space, Table, Tag } from 'antd';

import './index.css';

type FieldType = {
  phone?: string;
  nickname?: string;
  status?: string;
};

const onFinish = (values: FieldType) => {
  console.log('查询条件:', values);
};
interface DataType {
  key: string;
  userId: string;
  avatar: string;
  nickname: string;
  phone: string;
  tags: string[];
  registerTime: string;
  status: 'active' | 'banned';
}
// 模拟数据
const mockData: DataType[] = [
  {
    key: '1',
    userId: 'U10001',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
    nickname: '张三',
    phone: '13800138001',
    tags: ['新用户', 'VIP'],
    registerTime: '2024-06-15 10:30:00',
    status: 'active',
  },
  {
    key: '2',
    userId: 'U10002',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka',
    nickname: '李四',
    phone: '13800138002',
    tags: ['活跃用户'],
    registerTime: '2024-06-10 14:20:00',
    status: 'active',
  },
  {
    key: '3',
    userId: 'U10003',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bob',
    nickname: '王五',
    phone: '13800138003',
    tags: ['新用户'],
    registerTime: '2024-06-20 09:15:00',
    status: 'banned',
  },
];
export default function UserManagement() {
  const [form] = Form.useForm();

  const handleReset = () => {
    form.resetFields();
    onFinish({});
  };
  // 编辑
  const handleEdit = (record: DataType) => {
    message.info(`编辑用户：${record.nickname}`);
  };

  // 删除
  const handleDelete = (record: DataType) => {
    message.success(`已删除用户：${record.nickname}`);
  };

  // 表格列定义
  const columns = [
    {
      title: '用户ID',
      dataIndex: 'userId',
      key: 'userId',
      width: 100,
    },
    {
      title: '头像',
      dataIndex: 'avatar',
      key: 'avatar',
      width: 80,
      render: (avatar: string) => <Avatar src={avatar} size="large" />,
    },
    {
      title: '昵称',
      dataIndex: 'nickname',
      key: 'nickname',
      width: 120,
    },
    {
      title: '手机号',
      dataIndex: 'phone',
      key: 'phone',
      width: 140,
    },
    {
      title: '标签',
      dataIndex: 'tags',
      key: 'tags',
      render: (tags: string[]) => (
        <>
          {tags.map((tag) => {
            const color = tag === 'VIP' ? 'gold' : tag === '新用户' ? 'green' : 'blue';
            return (
              <Tag color={color} key={tag}>
                {tag}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: '注册时间',
      dataIndex: 'registerTime',
      key: 'registerTime',
      width: 180,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status: string) => (
        <Tag color={status === 'active' ? 'success' : 'error'}>
          {status === 'active' ? '启用' : '封禁'}
        </Tag>
      ),
    },
    {
      title: '操作',
      key: 'action',
      width: 150,
      render: (_: unknown, record: DataType) => (
        <Space size="middle">
          <Button type="link" size="small" onClick={() => handleEdit(record)}>
            编辑
          </Button>
          <Popconfirm
            title="确认删除"
            description={`确定要删除用户「${record.nickname}」吗？`}
            onConfirm={() => handleDelete(record)}
            okText="确定"
            cancelText="取消"
          >
            <Button type="link" danger size="small">
              删除
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];
  return (
    <div className="management-page">
      <div className="management-search">
        <Form form={form} name="userSearch" layout="inline" onFinish={onFinish} autoComplete="off">
          <Form.Item<FieldType> name="phone" label="手机号码">
            <Input placeholder="请输入手机号码" allowClear />
          </Form.Item>

          <Form.Item<FieldType> name="nickname" label="用户名称">
            <Input placeholder="请输入用户名称" allowClear />
          </Form.Item>

          <Form.Item<FieldType> name="status" label="状态">
            <Select
              placeholder="全部状态"
              allowClear
              style={{ width: 120 }}
              options={[
                { value: 'active', label: '启用' },
                { value: 'banned', label: '封禁' },
              ]}
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              查询
            </Button>
          </Form.Item>

          <Form.Item>
            <Button onClick={handleReset}>重置</Button>
          </Form.Item>
        </Form>
      </div>
      <div className="create-btn">
        <Button type="primary" htmlType="submit">
          + 新建用户
        </Button>
      </div>
      <div className="user-table">
        <Table
          columns={columns}
          dataSource={mockData}
          rowKey="key"
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total) => `共 ${total} 条`,
          }}
          scroll={{ x: 1000 }}
        />
      </div>
    </div>
  );
}
