import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectMenuCollapsed, toggleMenuCollapsed } from '@/store/modules/app';

import css from './index.module.less';

import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';

const MenuToggle = () => {
  const menuCollapsed = useSelector(selectMenuCollapsed);
  const dispatch = useDispatch();
  const onToggleClick = () => {
    dispatch(toggleMenuCollapsed());
  };
  return (
    <div className={css['menu-toggle']} onClick={onToggleClick}>
      {menuCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
    </div>
  );
};

export default MenuToggle;
