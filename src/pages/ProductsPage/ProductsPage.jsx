import React, { useEffect, useRef, useState } from 'react'
import NavbarComponent from '../../components/NavBarComponent/NavbarComponent'
import CardComponent from '../../components/CardComponent/CardComponent'
import { Col, Row, Pagination } from 'antd'
import { WrapperProduct } from './style'
import { WarrperTypeProduct } from '../HomePage/style'
import TypeProduct from '../../components/TypeProduct/TypeProduct'
import { useQuery } from '@tanstack/react-query'
import * as ProductService from '../../services/ProductService'
import { useSelector } from 'react-redux'
import Loading from '../../components/Loading/Loading'



const ProductsPage = () => {
  const arrTest = [
    { title: 'Trang chủ', value: '/' },
    { title: 'Product', value: '/product/' },
  ]
  const [currentPageNumber, setCurrentPageNumber] = useState(0)
  const [limitPerPage] = useState(8)
  const [totalProd, setTotalProd] = useState(0)
  const productSearch = useSelector((state) => state.product.search)
  const refSearch = useRef()
  const [stateProduct, setStateProduct] = useState([])



  const handlePageChange = (pageNumber, pageSize) => {
    setCurrentPageNumber(pageNumber - 1)
  };


  const fetchAllProduct = async (searchValue, currentPageNumber, limitPerPage) => {
    const res = await ProductService.GetProductFilter(searchValue, currentPageNumber, limitPerPage)
    setTotalProd(res.total)
    setStateProduct(res.data)
    return res
  }

  const { isLoading, data: products } = useQuery({ queryKey: ['product'], queryFn: fetchAllProduct, retry: 3, retryDelay: 1000 })


  useEffect(() => {
    if (products?.data?.length > 0) {
      setStateProduct(products?.data)
    }
  }, [products])

  // console.log(productSearch)

  useEffect(() => {
    if (refSearch.current) {
      fetchAllProduct(productSearch, currentPageNumber, limitPerPage)
    }
    refSearch.current = true
  }, [productSearch, currentPageNumber, limitPerPage])



  return (
    <>
      <div style={{ padding: '0 120px' }}>
        <WarrperTypeProduct>
          {arrTest.map((item) => {
            return (
              <TypeProduct name={item} key={item.value} />
            )
          })}
        </WarrperTypeProduct>
      </div>
      <div id="container" style={{ background: '#dbe4d8', padding: '20px 120px' }}>
        <Row justify="space-between">
          <Col span={4}>
            <NavbarComponent />
          </Col>
          <WrapperProduct span={20}>
            <Loading isLoading={isLoading}>
              <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '15px' }}>
                {stateProduct?.map((product => {
                  return (
                    <CardComponent
                      key={product.name}
                      name={product.name}
                      image={product.image}
                      type={product.type}
                      price={product.price}
                      countInStock={product.countInStock}
                      rating={product.rating}
                      description={product.description}
                      id={product._id}

                    />
                  )
                }))}
              </div>
            </Loading>
            <Pagination defaultCurrent={1} total={totalProd} defaultPageSize={8} onChange={handlePageChange} />
          </WrapperProduct>
        </Row>
      </div>
    </>
  )
}

export default ProductsPage