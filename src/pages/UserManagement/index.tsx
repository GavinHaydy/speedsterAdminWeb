import { useCallback, useEffect, useState } from 'react';

import {
  Avatar,
  Button,
  Form,
  Input,
  message,
  Modal,
  Popconfirm,
  Select,
  Space,
  Table,
  Tag,
} from 'antd';

import { register, userList } from '@/api/generated/iam';
import type { RegisterParams, UserListParams, UserListResultItem } from '@/types/generated/iam';

import './index.css';

export default function UserManagement() {
  const [form] = Form.useForm();
  const [createForm] = Form.useForm<RegisterParams>();
  const [data, setData] = useState<UserListResultItem[]>([]);
  const [pageNo, setPageNo] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  // ========== 获取数据接口调用 ==========
  const fetchUserList = useCallback(async (params: UserListParams = {}) => {
    setLoading(true);
    try {
      // 调用接口（不传参数或传空对象）
      const response = await userList({
        pageNo: 1,
        pageSize: 10,
        ...params,
      });
      console.log('接口返回数据:', response);
      // 根据实际接口返回结构调整数据
      // 假设返回的数据结构是 { data: { list: UserListResult[], total: number } }
      setData(response.list || []);
      setTotal(response.total || 0);
      // 如果接口返回的是分页数据，可以这样处理：
      // setData(response?.data?.list || []);
      // setTotal(response?.data?.total || 0);
    } catch (error) {
      console.error('获取用户列表失败:', error);
      message.error('获取用户列表失败');
    } finally {
      setLoading(false);
    }
  }, []);

  // ========== 组件加载时自动获取数据 ==========
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void fetchUserList({
      pageNo: 1,
      pageSize: 10,
    });
  }, [fetchUserList]);

  const handleSearch = (values: UserListParams) => {
    setPageNo(1);
    fetchUserList({
      ...values,
      pageNo: 1,
      pageSize,
    }).then((r) => r);
  };

  const handleReset = () => {
    form.resetFields();
    setPageNo(1);
    fetchUserList({
      pageNo: 1,
      pageSize,
    }).then((r) => r);
  };

  // 编辑
  const handleEdit = (record: UserListResultItem) => {
    message.info(`编辑用户：${record.nickname}`).then();
  };

  // 删除
  const handleDelete = (record: UserListResultItem) => {
    message.success(`已删除用户：${record.nickname}`).then();
  };

  // 新增用户
  const [modalStatus, setModalStatus] = useState(false);
  const handleOpenModal = () => {
    setModalStatus(true);
  };

  const cancelModal = () => {
    setModalStatus(false);
  };

  const handleOk = () => {
    createForm.submit();
  };

  const handleFinish = async (values: RegisterParams) => {
    try {
      const r = await register(values, false);
      void message.success(r.user_id);
      createForm.resetFields();
      setModalStatus(false);
    } catch (error) {
      void message.error(error instanceof Error ? error.message : '');
    }
  };

  // 表格列定义
  const columns = [
    {
      title: '用户名',
      dataIndex: 'username',
      key: 'username',
      width: 120,
    },
    {
      title: '手机号',
      dataIndex: 'phone',
      key: 'phone',
      width: 140,
      render: (text: string) => <div>{text == '' ? '-' : text}</div>,
    },
    {
      title: '电子邮箱',
      dataIndex: 'email',
      key: 'email',
      width: 200,
      render: (text: string) => <div>{text == '' ? '-' : text}</div>,
    },
    {
      title: '头像',
      dataIndex: 'avatar',
      key: 'avatar',
      width: 80,
      render: (avatar: string) => <Avatar src={avatar || undefined} size="large" />,
    },
    {
      title: '昵称',
      dataIndex: 'nickname',
      key: 'nickname',
      width: 120,
    },
    // {
    //   title: '标签',
    //   dataIndex: 'tags',
    //   key: 'tags',
    //   render: (tags: string[]) => (
    //     <>
    //       {tags.map((tag) => {
    //         const color = tag === 'VIP' ? 'gold' : tag === '新用户' ? 'green' : 'blue';
    //         return (
    //           <Tag color={color} key={tag}>
    //             {tag}
    //           </Tag>
    //         );
    //       })}
    //     </>
    //   ),
    // },
    // {
    //   title: '注册时间',
    //   dataIndex: 'registerTime',
    //   key: 'registerTime',
    //   width: 180,
    // },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status: number) => (
        <Tag color={status === 1 ? 'success' : 'error'}>{status === 1 ? '启用' : '封禁'}</Tag>
      ),
    },
    {
      title: '操作',
      key: 'action',
      width: 150,
      render: (_: unknown, record: UserListResultItem) => (
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
        <Form
          form={form}
          name="userSearch"
          layout="inline"
          onFinish={handleSearch}
          autoComplete="off"
        >
          <Form.Item<UserListParams> name="phone" label="手机号码">
            <Input placeholder="请输入手机号码" allowClear />
          </Form.Item>

          <Form.Item<UserListParams> name="username" label="用户名">
            <Input placeholder="请输入用户名" allowClear />
          </Form.Item>

          <Form.Item<UserListParams> name="nickname" label="用户昵称">
            <Input placeholder="请输入用户昵称" allowClear />
          </Form.Item>

          <Form.Item<UserListParams> name="status" label="状态">
            <Select
              placeholder="全部状态"
              allowClear
              style={{ width: 120 }}
              options={[
                { value: 1, label: '启用' },
                { value: 2, label: '封禁' },
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
        <Button type="primary" htmlType="submit" onClick={handleOpenModal}>
          + 新建用户
        </Button>
      </div>
      <div className="user-table">
        <Table
          columns={columns}
          dataSource={data}
          rowKey="username"
          loading={loading}
          pagination={{
            current: pageNo,
            pageSize: pageSize,
            showSizeChanger: true,
            showTotal: (total) => `共 ${total} 条`,
            onChange: (newPageNo, newPageSize) => {
              setPageNo(newPageNo);
              setPageSize(newPageSize);
              const values = form.getFieldsValue();
              fetchUserList({
                ...values,
                pageNo: newPageNo,
                pageSize: newPageSize,
              }).then((r) => r);
            },
            total,
          }}
          scroll={{ x: 1000 }}
        />
      </div>
      <Modal open={modalStatus} onCancel={cancelModal} onOk={handleOk}>
        <Form form={createForm} layout="vertical" onFinish={handleFinish}>
          <Form.Item
            label={'用户名'}
            name={'username'}
            rules={[{ required: true, message: '请输入用户名' }]}
          >
            <Input style={{ width: '40%' }} />
          </Form.Item>

          <Form.Item
            label={'密码'}
            name={'password'}
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input style={{ width: '40%' }} />
          </Form.Item>
          <Form.Item label={'邮箱'} name={'email'}>
            <Input style={{ width: '40%' }} />
          </Form.Item>

          <Form.Item label={'手机号'} name={'phone'}>
            <Input style={{ width: '40%' }} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
