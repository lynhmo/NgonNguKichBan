import React from 'react'
import ProductDetailComponent from '../../components/ProductDetailComponent/ProductDetailComponent'
import { useParams } from 'react-router-dom'
import { ArrowLeftOutlined } from '@ant-design/icons';
import { GoHome } from './style';
import { useNavigate } from 'react-router-dom'

const ProductDetailPage = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    return (
        <div>

            <div style={{ padding: '0 120px' }}>
                <GoHome onClick={() => { navigate('/product') }}>
                    <ArrowLeftOutlined />
                    <span style={{ marginLeft: '20px' }}>Go back to product page</span>
                </GoHome>
            </div>
            <div style={{ padding: '30px 120px', backgroundColor: '#dbe4d8' }}>
                <ProductDetailComponent idProduct={id} />
            </div>
        </div>
    )
}

export default ProductDetailPage