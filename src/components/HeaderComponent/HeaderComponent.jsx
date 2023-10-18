import React from "react";
import { Col } from "antd";
import { WrapperHeader, WrapperTextHeader } from "./style";
// import Search from "antd/lib/transfer/search";
import { Input } from 'antd';
// import type { SearchProps } from '../Search';
const { Search } = Input;
const HeaderComponent = () => {
  return (
    <div>
      <WrapperHeader>
        <Col span={6}>
          <WrapperTextHeader>BOTSTORE</WrapperTextHeader>
        </Col>
        <Col span={12}>
          <Search
            placeholder="input search text"
            allowClear
            enterButton="Search"
            size="large"
          // onSearch={onSearch}
          />
        </Col>
        <Col span={6}>
          LOGIN
        </Col>
      </WrapperHeader>
    </div>
  );
};

export default HeaderComponent;
