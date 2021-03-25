import React, { FC, useState, useEffect } from 'react';
import { Layout, Menu } from 'antd';

import { RouterMain } from '@/router';

import css from './index.module.less';

import { registerMicroApps, start } from 'qiankun';

const { Header, Sider, Content, Footer } = Layout;
const { SubMenu } = Menu;

const LayoutMain: FC = (props: any) => {
  const [collapsed, setCollapsed] = useState(false);

  const [openMenu, setOpenMenu] = useState<string[]>([]);

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
    <Layout className={css['layout-main']}>
      <Header className={css['header']}>header</Header>
      <Layout>
        <Sider>
          <Menu
            theme="dark"
            mode="inline"
            onClick={handleMenuClick}
            openKeys={openMenu}
            selectedKeys={props.location.pathname}
            onOpenChange={handleOpenChange}
          >
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
        <Content className={css['content']}>
          {props.children}
          <div id="sub-app"></div>
        </Content>
      </Layout>
      <Footer>footer</Footer>
    </Layout>
  );
};

export default LayoutMain;
