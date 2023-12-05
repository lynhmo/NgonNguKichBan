import React from "react";
import { Col } from "antd";
import { WrapperAccount, WrapperHeader, WrapperTextHeader, AccountText } from "./style";
import { UserOutlined, CaretDownOutlined, ShoppingCartOutlined } from '@ant-design/icons';
// import { Input } from 'antd';
import ButtonInputSearch from "../ButtonInputSearch/ButtonInputSearch";
// import type { SearchProps } from '../Search';
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

// const { Search } = Input;
const HeaderComponent = () => {
  const navigate = useNavigate()
  const handleNavigateLogin = () => {
    navigate('/sign-in')
  }
  const user = useSelector((state) => state.user)
  // console.log(user);

  return (
    <div>
      <WrapperHeader>
        <Col span={4}>
          <WrapperTextHeader>BOTSTORE</WrapperTextHeader>
        </Col>
        <Col span={13}>
          <ButtonInputSearch
            size='large'
            placeholder='Search'
            textButton='Search'
          />
        </Col>
        <Col span={7}>
          <WrapperAccount>
            <AccountText>
              <UserOutlined style={{ fontSize: '30px' }} />
            </AccountText>
            <AccountText >
              {user?.name ? (
                <div>{user?.name}</div>
              ) : (
                <div onClick={handleNavigateLogin} style={{ textDecoration: 'none', color: '#fff', cursor: 'pointer' }}>SignIn/ SignOut</div>
              )}
              <div>
                <span>Account</span>
                <CaretDownOutlined />
              </div>
            </AccountText>
            <AccountText className="Cart">
              <div style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
                <ShoppingCartOutlined style={{ fontSize: '30px' }} />
                <span style={{ marginLeft: '10px' }}>Cart</span>
              </div>
            </AccountText>
          </WrapperAccount>
        </Col>
      </WrapperHeader>
    </div >
  );
};

export default HeaderComponent;
