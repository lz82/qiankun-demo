import React, { FC, useEffect } from 'react';
import { Layout } from 'antd';
import { registerMicroApps, start } from 'qiankun';

import css from './index.module.less';

const { Header, Footer, Content } = Layout;

const LayoutBlank: FC = (props) => {
  useEffect(() => {
    registerMicroApps([
      {
        name: 'g6editor',
        entry: 'http://localhost:10000/',
        container: '#sub-app',
        activeRule: '/app/g6-editor'
      }
    ]);
    start({ prefetch: 'all' });
  });
  return (
    <Layout className={css['layout-blank']}>
      <Header className={css['header']}>blank header</Header>
      <Content className={css['content']}>
        {props.children}
        <div id="sub-app" />
      </Content>
      <Footer className={css['footer']}>footer</Footer>
    </Layout>
  );
};

export default LayoutBlank;
