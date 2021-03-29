import React, { useEffect } from 'react';
import { Form, Input, Button, message } from 'antd';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  checkLogin,
  getUserInfo,
  selectToken,
  selectErrMsg,
  selectUserInfo,
  clearErrMsg,
  setErrMsg
} from '@/store/modules/app';
import { UserOutlined, KeyOutlined } from '@ant-design/icons';

import { ICheckLoginRequest } from '@/services/app/types';

import css from './index.module.less';

const Login = () => {
  const token = useSelector(selectToken);
  const errMsg = useSelector(selectErrMsg);
  const userInfo = useSelector(selectUserInfo);
  const dispatch = useDispatch();
  const history = useHistory();

  const onLogin = async (value: ICheckLoginRequest) => {
    try {
      dispatch(checkLogin(value));
    } catch (err) {
      dispatch(setErrMsg(err.toString()));
    }
  };

  useEffect(() => {
    if (token) {
      // 根据token获取用户信息
      dispatch(getUserInfo(token));
      history.push('/admin/home');
    }
  }, [token]);

  useEffect(() => {
    if (errMsg) {
      message.error(errMsg);
      dispatch(clearErrMsg());
    }
  }, [errMsg]);

  return (
    <div className={css['login-wrapper']}>
      <div className={css['container']}>
        <div className={css['logo']} />
        <Form name="login" onFinish={onLogin}>
          <Form.Item name="username" rules={[{ required: true, message: '请输入用户名' }]}>
            <Input prefix={<UserOutlined />} placeholder="请输入用户名" />
          </Form.Item>
          <Form.Item name="password" rules={[{ required: true, message: '请输入密码' }]}>
            <Input prefix={<KeyOutlined />} placeholder="请输入密码" type="password" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" shape="round" block>
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
