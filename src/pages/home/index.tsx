import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  checkLogin,
  getUserInfo,
  selectToken,
  selectErrMsg,
  selectUserInfo
} from '@/store/modules/app';
import { Button, Input } from 'antd';
import css from './index.module.less';

const Home = () => {
  const token = useSelector(selectToken);
  const errMsg = useSelector(selectErrMsg);
  const userInfo = useSelector(selectUserInfo);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!token) {
      dispatch(checkLogin({ username: '1', password: '2', verifyCode: 'c' }));
    }
  }, []);

  useEffect(() => {
    if (token) {
      // 根据token获取用户信息
      dispatch(getUserInfo(token));
    }
  }, [token]);

  const onGetClick = () => {
    if (token) {
      dispatch(getUserInfo(token));
    }
  };

  return (
    <div className={css['home']}>
      home{token}
      {errMsg}
      {JSON.stringify(userInfo)}
      <Button onClick={onGetClick}>get userinfo</Button>
      <Input />
    </div>
  );
};

export default Home;
