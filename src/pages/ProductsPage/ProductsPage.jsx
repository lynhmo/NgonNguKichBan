import React from 'react'
import NavbarComponent from '../../components/NavBarComponent/NavbarComponent'
import CardComponent from '../../components/CardComponent/CardComponent'
import { Col, Row, Pagination } from 'antd'
import { WrapperProduct } from './style'
import { WarrperTypeProduct } from '../HomePage/style'
import TypeProduct from '../../components/TypeProduct/TypeProduct'

const ProductsPage = () => {
  const arrTest = [
    { title: 'Trang chủ', value: '/' },
    { title: 'Product', value: '/product/' },
  ]
  return (
    <>
      <div style={{ padding: '0 120px' }}>
        <WarrperTypeProduct>
          {/* {arr.map((item) => {
            return (
              <TypeProduct name={item} key={item} />
            )
          })} */}
          {arrTest.map((item) => {
            return (
              <TypeProduct name={item} key={item} />
            )
          })}
        </WarrperTypeProduct>
      </div>
      <div id="container" style={{ background: '#efefef', padding: '20px 120px' }}>
        <Row justify="space-between">
          <Col span={4}>
            <NavbarComponent />
          </Col>
          <WrapperProduct span={20}>
            {/* <div style={{ display: 'flex', gap: '20px', justifyContent: 'space-around' }}>
          </div> */}
            <CardComponent />
            <CardComponent />
            <CardComponent />
            <CardComponent />
            <CardComponent />
            <CardComponent />
            <CardComponent />
            <CardComponent />
            <CardComponent />
            <CardComponent />
            <CardComponent />
            <CardComponent />
            <Pagination defaultCurrent={6} total={100} style={{ margin: '50px 0', }} />
          </WrapperProduct>
        </Row>
      </div>
    </>
  )
}

export default ProductsPage