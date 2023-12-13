import React from 'react'
import { Row, Col, Image, InputNumber } from 'antd';
import { WarpperName, WarpperPrice, WarpperQuantity } from './style';
import { StarFilled } from '@ant-design/icons';
import ButtonComponent from '../ButtonComponent/ButtonComponent';
import * as ProductService from '../../services/ProductService'
import { useQuery } from '@tanstack/react-query'

const ProductDetailComponent = ({ idProduct }) => {
    const onChange = () => { }
    const fetchGetDetailProducts = async (id) => {
        const res = await ProductService.getDetailProduct(idProduct)
        return res.data
    }

    const { data: productsDetail } = useQuery({ queryKey: ['products-detail'], queryFn: fetchGetDetailProducts, enabled: !!idProduct })
    console.log('productsDetail', productsDetail)
    const StarRating = (rating) => {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;

        const stars = Array.from({ length: fullStars }, (_, index) => (
            <StarFilled key={index} style={{ fontSize: '16px', color: '#ffc400' }} />
        ));

        if (hasHalfStar) {
            stars.push(
                <StarFilled
                    key={fullStars}
                    style={{ fontSize: '16px', color: '#ffc400', clipPath: 'polygon(0 0, 50% 0, 50% 100%, 0 100%)' }}
                />
            );
        }

        return <div>{stars}</div>;
    };
    const formattedAmount = productsDetail?.price.toLocaleString('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });
    return (
        <Row style={{ padding: '16px', backgroundColor: '#fff', borderRadius: '10px' }}>
            <Col span={10}>
                <Image src={productsDetail?.image} alt="img product" preview={true} style={{ borderRadius: '10px' }}></Image>
            </Col>
            <Col span={14} style={{ padding: '22px' }}>
                <WarpperName>{productsDetail?.name}</WarpperName>
                <p style={{ fontSize: 16, fontWeight: 400 }}>Type: {productsDetail?.type}</p>
                <h4 >
                    <div style={{ display: 'flex', gap: '10px', fontWeight: 400, fontSize: 16 }}>
                        {productsDetail?.rating}
                        {StarRating(productsDetail?.rating)}
                    </div>
                </h4>
                <WarpperPrice>{formattedAmount}</WarpperPrice>
                <div>In stock: {productsDetail?.countInStock}</div>
                <WarpperQuantity>
                    <div>Số lượng:</div>
                    <div style={{ display: 'flex', flexDirection: 'row', gap: '5px' }}>
                        <InputNumber min={1} max={10} defaultValue={1} onChange={onChange} />
                    </div>
                </WarpperQuantity>
                <div style={{ marginTop: '20px' }}>
                    <ButtonComponent
                        size={20}
                        styleButton={{ backgroundColor: '#72af5c', color: 'white', borderRadius: '6px', width: '250px', height: '50px', fontSize: '18px', fontWeight: '500' }}
                        textButton={'Thêm vào giỏ hàng'}
                    />
                </div>
                <div>{productsDetail?.description}</div>
            </Col>
        </Row>

    )
}

export default ProductDetailComponent