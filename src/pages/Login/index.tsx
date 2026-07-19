import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { DashboardOutlined, LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Card, Form, Input, message } from 'antd';

import { accountLogin, userPermission } from '@/api/generated/iam';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  login,
  logout,
  selectUserLoading,
  setLoading,
  setLoginError,
  setPermissions,
} from '@/store/slices/userSlice';
import type { AccountLoginParams } from '@/types/generated/iam';
import { initWasm } from '@/utils/wasm.ts';

import './index.css';

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectUserLoading);

  useEffect(() => {
    dispatch(logout());
  }, [dispatch]);

  useEffect(() => {
    async function load() {
      await initWasm();
    }
    load().then();
  });

  const onFinish = async (values: AccountLoginParams) => {
    dispatch(setLoading(true));
    try {
      const result = await accountLogin({
        ...values,
        password: window.encryptAES(values.password),
      });
      dispatch(login(result));

      const permission = await userPermission();

      dispatch(setPermissions(permission));

      navigate('/dashboard', { replace: true });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '登录失败';
      dispatch(setLoginError(errorMessage));
      message.error(errorMessage);
    }
  };

  return (
    <div className="login-page">
      <div className="login-page-brand">
        <div className="login-page-brand-content">
          <div className="login-page-brand-logo">
            <DashboardOutlined />
          </div>
          <h1>Speedster 管理后台</h1>
          <p>外卖平台运营管理中枢，统一管理用户、商家、订单与配送业务。</p>
          <div className="login-page-features">
            <div className="login-page-feature-item">
              <span className="login-page-feature-dot" />
              实时掌握平台核心运营数据
            </div>
            <div className="login-page-feature-item">
              <span className="login-page-feature-dot" />
              高效管理商家入驻与商品信息
            </div>
            <div className="login-page-feature-item">
              <span className="login-page-feature-dot" />
              全流程订单跟踪与权限管控
            </div>
          </div>
        </div>
      </div>

      <div className="login-page-panel">
        <Card className="login-page-card" variant={'borderless'}>
          <div className="login-page-card-header">
            <h2>欢迎登录</h2>
            <p>请输入您的账号和密码</p>
          </div>
          <Form
            name="login"
            size="large"
            className="login-page-form"
            autoComplete="off"
            onFinish={onFinish}
          >
            <Form.Item name="username" rules={[{ required: true, message: '请输入账号' }]}>
              <Input prefix={<UserOutlined />} placeholder="请输入账号" />
            </Form.Item>

            <Form.Item name="password" rules={[{ required: true, message: '请输入密码' }]}>
              <Input.Password prefix={<LockOutlined />} placeholder="请输入密码" />
            </Form.Item>

            <Form.Item className="login-page-form-submit">
              <Button type="primary" htmlType="submit" block loading={loading}>
                登录
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  );
}
