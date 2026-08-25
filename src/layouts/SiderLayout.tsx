import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';

import { HomeOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';

import { IconFont } from '@/components/IconFont.ts';

export const MenuLayout: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  // const [selectedKey, setSelectedKey] = useState<string>(location.pathname);
  const selectedKey = location.pathname;

  // useEffect(() => {
  //   // 当路由改变时更新选中的菜单项
  //   setSelectedKey(location.pathname);
  // }, [location.pathname]);

  type ItemType = Required<MenuProps>['items'][number];

  function getItem(
    label: string,
    key: string,
    icon?: React.ReactNode,
    children?: ItemType[],
  ): ItemType {
    return {
      key,
      icon,
      children,
      label: t(label),
    } as ItemType;
  }

  const items: ItemType[] = [
    getItem('menu.dashboard', '/dashboard', <HomeOutlined />),
    getItem('menu.user', '/user', <IconFont type={'icon-connect'} />),
    getItem('menu.role', '/role', <IconFont type={'icon-invite'} />),
    getItem('menu.merchant', '/merchant', <IconFont type={'icon-scene'} />),
    getItem('menu.product', '/product', <IconFont type={'icon-performance'} />),
    getItem('menu.order', '/order', <IconFont type={'icon-web-auto'} />),
    getItem('menu.delivery', '/delivery', <IconFont type={'icon-auto'} />),
    getItem('menu.financial', '/financial', <IconFont type={'icon-env'} />),
    getItem('menu.marketing', '/marketing', <IconFont type={'icon-machine'} />),
  ];

  const onClick: MenuProps['onClick'] = (e) => {
    navigate(e.key); // 跳转路由
  };

  return (
    <>
      <div className="demo-logo-vertical" />
      <Menu mode="inline" selectedKeys={[selectedKey]} onClick={onClick} items={items} />
    </>
  );
};
