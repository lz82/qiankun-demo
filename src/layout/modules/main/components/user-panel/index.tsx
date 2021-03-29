import React, { FC, useEffect, useState, useMemo } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import classnames from 'classnames';

import { Dropdown, Menu } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { MenuInfo } from 'rc-menu/lib/interface';

import css from './index.module.less';

const UserPanel: FC = (props: any) => {
  const { token, noticeList, dispatch } = props;

  const history = useHistory();
  const location = useLocation();

  const [showNotice, setShowNotice] = useState(false);

  const onWorkbenchClick = () => {
    history.push('/workbench');
  };

  const onAvatarClick = ({ key }: MenuInfo) => {
    if (key === '1') {
      history.push('/admin/mgt/my');
    }
    if (key === '0') {
      // appActions.logout();
    }
  };

  const menuAvatar = (
    <Menu onClick={onAvatarClick}>
      <Menu.Item key="1">个人中心</Menu.Item>
      <Menu.Divider />
      <Menu.Item key="0">退出登录</Menu.Item>
    </Menu>
  );

  return (
    <div className={css['user-panel-wrapper']}>
      <div className={css['info-wrapper']}>
        <Dropdown overlay={menuAvatar}>
          <UserOutlined className={classnames(css['icon-btn'], css['user'])} />
        </Dropdown>
      </div>
    </div>
  );
};

export default UserPanel;
