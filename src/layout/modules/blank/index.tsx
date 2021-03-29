import React, { FC } from 'react';
import { Layout } from 'antd';
import PageFooter from '@/components/page-footer';
import css from './index.module.less';

const { Header, Content } = Layout;

const LayoutBlank: FC = (props) => {
  return (
    <Layout className={css['layout-blank']}>
      <Content className={css['content']}>
        {props.children}
        <div id="sub-app" />
      </Content>
      <PageFooter />
    </Layout>
  );
};

export default LayoutBlank;
