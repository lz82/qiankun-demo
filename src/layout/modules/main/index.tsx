import React, { FC, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectMenuCollapsed, toggleMenuCollapsed } from '@/store/modules/app';
import { Layout, Menu } from 'antd';
import PageFooter from '@/components/page-footer';
import { RouterMain } from '@/router';

import css from './index.module.less';

import { registerMicroApps, start } from 'qiankun';
import UserPanel from './components/user-panel';
import MenuToggle from './components/menu-toggle';

const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;

const LayoutMain: FC = (props: any) => {
  const [collapsed, setCollapsed] = useState(false);

  const [openMenu, setOpenMenu] = useState<string[]>([]);

  const menuCollapsed = useSelector(selectMenuCollapsed);

  useEffect(() => {
    getOpenMenu();
    /* eslint-disable */
  }, []);

  useEffect(() => {
    registerMicroApps([
      {
        name: 'g6-editor',
        entry: 'http://localhost:10000/',
        container: '#sub-app',
        activeRule: '/admin/app/g6-editor'
      }
    ]);
    start({ prefetch: 'all' });
  });

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const handleMenuClick = (e: any) => {
    props.history.push(e.key);
  };

  const handleOpenChange = (openKeys: any) => {
    setOpenMenu(openKeys);
  };

  const getOpenMenu = () => {
    const currentPath = props.location.pathname;
    const temp = currentPath.split('/');
    if (temp.length > 3) {
      const ret = temp.slice(0, 3).join('/');
      setOpenMenu([ret]);
    } else {
      return [];
    }
  };

  return (
    <Layout>
      <Sider className={css['sider']} collapsed={menuCollapsed}>
        <Menu
          theme="light"
          mode="inline"
          onClick={handleMenuClick}
          openKeys={openMenu}
          selectedKeys={props.location.pathname}
          onOpenChange={handleOpenChange}
          className={css['menu']}
        >
          <div className={css['logo']} />
          {RouterMain.filter((item) => !item.noMenu).map((router) =>
            router.child ? (
              <SubMenu
                key={router.path}
                title={
                  <span>
                    {router.icon ? <router.icon /> : null}
                    <span>{router.name}</span>
                  </span>
                }
              >
                {router.child
                  .filter((item) => !item.noMenu)
                  .map((item) => (
                    <Menu.Item key={item.path}>
                      {item.icon ? <item.icon /> : null}
                      <span>{item.name}</span>
                    </Menu.Item>
                  ))}
              </SubMenu>
            ) : (
              <Menu.Item key={router.path}>
                {router.icon ? <router.icon /> : null}
                <span>{router.name}</span>
              </Menu.Item>
            )
          )}
        </Menu>
      </Sider>
      <Layout className={css['layout-main']}>
        <Header className={css['header']}>
          <MenuToggle />
          <UserPanel />
        </Header>
        <Content className={css['content']}>
          {props.children}
          <div id="sub-app" className={css['sub-app-container']}></div>
        </Content>
        <PageFooter />
      </Layout>
    </Layout>
  );
};

export default LayoutMain;
