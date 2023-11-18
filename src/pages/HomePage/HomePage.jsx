import React from 'react'
import TypeProduct from '../../components/TypeProduct/TypeProduct'
import { WarrperProductChild, WarrperTypeProduct } from './style'
import SliderComponent from '../../components/SliderComponent/SliderComponent'
import slider6 from '../../assets/images/slider6.jpg'
import slider2 from '../../assets/images/slider2.jpg'
import slider3 from '../../assets/images/slider3.jpg'
import CardComponent from '../../components/CardComponent/CardComponent'
import NavbarComponent from '../../components/NavBarComponent/NavbarComponent'
import { Row } from 'antd'


const HomePage = () => {
  const arrTest = [
    { title: 'Trang chủ', value: '/' },
    { title: 'Product', value: '/product' },
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
        <SliderComponent arrImages={[slider6, slider2, slider3]} />
        {/* <div style={{ marginTop: '50px', display: 'flex', gap: '20px' }}>
          <CardComponent />
          <CardComponent />
          <CardComponent />
          <CardComponent />
        </div> */}
        <div style={{ display: 'flex', flexDirection: 'row', marginTop: '50px' }}>
          {/* NAV */}
          <div style={{ width: '15%' }}>
            <NavbarComponent />
          </div>
          {/* Product */}
          <div style={{ width: '85%' }}>
            <Row gutter={[0, 48]}>
              <WarrperProductChild span={6}>
                <CardComponent />
              </WarrperProductChild>
              <WarrperProductChild span={6}>
                <CardComponent />
              </WarrperProductChild>
              <WarrperProductChild span={6}>
                <CardComponent />
              </WarrperProductChild>
              <WarrperProductChild span={6}>
                <CardComponent />
              </WarrperProductChild>
            </Row>
          </div>
        </div>
      </div>

    </>
  )
}

export default HomePage