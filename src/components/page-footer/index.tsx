import React from 'react';
import { Layout } from 'antd';

import css from './index.module.less';

const { Footer } = Layout;

const PageFooter = () => {
  return (
    <Footer className={css['footer']}>
      <a href="http://beian.miit.gov.cn">沪ICP备18005170号-139</a>
    </Footer>
  );
};

export default PageFooter;
