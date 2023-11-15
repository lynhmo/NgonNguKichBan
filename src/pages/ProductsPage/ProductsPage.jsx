import React from 'react'
import NavbarComponent from '../../components/NavBarComponent/NavbarComponent'
import CardComponent from '../../components/CardComponent/CardComponent'
import { Col, Row } from 'antd'

const ProductsPage = () => {
  return (
    <div id="container" style={{ background: '#efefef', padding: '20px 120px' }}>
      <Row justify="space-between">
        <Col span={3}>
          <NavbarComponent />
        </Col>
        <Col span={20}>
          <div style={{ display: 'flex', gap: '20px', justifyContent: 'space-around' }}>
            <CardComponent />
            <CardComponent />
            <CardComponent />
            <CardComponent />
            <CardComponent />
          </div>
          <div style={{ display: 'flex', gap: '20px', justifyContent: 'space-around' }}>
            <CardComponent />
            <CardComponent />
            <CardComponent />
            <CardComponent />
            <CardComponent />
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default ProductsPage