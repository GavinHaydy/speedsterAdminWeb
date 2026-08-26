import { Form, Input } from 'antd';

import type { RoleListParams } from '@/types/generated';

export const RoleManagement: React.FC = () => {
  const [searchForm] = Form.useForm();

  return (
    <>
      <Form
        form={searchForm}
        layout="inline"
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
          <Input allowClear />
        </Form.Item>
      </Form>
    </>
  );
};
