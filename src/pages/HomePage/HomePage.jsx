import React from 'react'
import TypeProduct from '../../components/TypeProduct/TypeProduct'
import { WarrperProductChild, WarrperTypeProduct } from './style'
import SliderComponent from '../../components/SliderComponent/SliderComponent'
import slider6 from '../../assets/images/slider6.jpg'
import slider2 from '../../assets/images/slider2.jpg'
import slider3 from '../../assets/images/slider3.jpg'
import CardComponent from '../../components/CardComponent/CardComponent'
// import NavbarComponent from '../../components/NavBarComponent/NavbarComponent'
import { Row } from 'antd'
import { useQuery } from '@tanstack/react-query'
import * as ProductService from '../../services/ProductService'
const HomePage = () => {
  const arrTest = [
    { title: 'Trang chủ', value: '/' },
    { title: 'Product', value: '/product' },
  ]

  const fetchAllProduct = async () => {
    const res = await ProductService.GetAllProduct()
    // console.log(res);
    return res
  }
  const { data: products } = useQuery({ queryKey: 'product', queryFn: fetchAllProduct, retry: 3, retryDelay: 1000 })



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

      <div id="container" style={{ background: '#dbe4d8', padding: '20px 120px' }}>
        <SliderComponent arrImages={[slider6, slider2, slider3]} />
        {/* <div style={{ marginTop: '50px', display: 'flex', gap: '20px' }}>
          <CardComponent />
          <CardComponent />
          <CardComponent />
          <CardComponent />
        </div> */}
        <div style={{ display: 'flex', flexDirection: 'row', marginTop: '50px' }}>
          {/* NAV */}
          {/* <div style={{ width: '15%' }}>
            <NavbarComponent />
          </div> */}
          {/* Product */}
          <div style={{ width: '100%' }}>
            <Row gutter={[0, 48]}>
              {products?.data?.map((product => {
                return (
                  <WarrperProductChild span={6}>
                    <CardComponent
                      key={product._id}
                      name={product.name}
                      image={product.image}
                      type={product.type}
                      price={product.price}
                      countInStock={product.countInStock}
                      rating={product.rating}
                      description={product.description}
                    />
                  </WarrperProductChild>
                )
              }))}
            </Row>
          </div>
        </div>
      </div>

    </>
  )
}

export default HomePage