import React from "react";
import { Col } from "antd";
import { WrapperAccount, WrapperHeader, WrapperTextHeader, AccountText } from "./style";
import { UserOutlined, CaretDownOutlined, ShoppingCartOutlined } from '@ant-design/icons';
// import { Input } from 'antd';
import ButtonInputSearch from "../ButtonInputSearch/ButtonInputSearch";
// import type { SearchProps } from '../Search';



// const { Search } = Input;
const HeaderComponent = () => {
  return (
    <div>
      <WrapperHeader>
        <Col span={6}>
          <WrapperTextHeader>BOTSTORE</WrapperTextHeader>
        </Col>
        <Col span={12}>
          <ButtonInputSearch
            size='large'
            placeholder='Search'
            textButton='Search'
          />
        </Col>
        <Col span={6}>
          <WrapperAccount>
            <AccountText>
              <UserOutlined style={{ fontSize: '30px' }} />
            </AccountText>
            <AccountText>
              <span>Sign In/Sign Out</span>
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
