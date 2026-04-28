import { useState } from 'react';
import { Form, Input, Button, Card, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // 登录表单提交
  const onFinish = async (values: Record<string, unknown>) => {
    setLoading(true);
    try {
      // 这里写你的登录接口请求
      console.log('登录信息：', values);

      // 登录成功后：存redux + 跳转首页
      // dispatch(loginAction(values))
      message.success('登录成功');
      navigate('/');
    } catch {
      message.error('账号密码错误，请重试');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-box">
      <Card title="系统登录" style={{ width: 400 }}>
        <Form name="login" autoComplete="off" onFinish={onFinish}>
          {/* 账号输入框 */}
          <Form.Item name="username" rules={[{ required: true, message: '请输入账号' }]}>
            <Input prefix={<UserOutlined />} placeholder="请输入账号" />
          </Form.Item>

          {/* 密码输入框 */}
          <Form.Item name="password" rules={[{ required: true, message: '请输入密码' }]}>
            <Input.Password prefix={<LockOutlined />} placeholder="请输入密码" />
          </Form.Item>

          {/* 登录按钮 */}
          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
