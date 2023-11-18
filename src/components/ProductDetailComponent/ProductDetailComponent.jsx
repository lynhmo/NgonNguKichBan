import React from 'react'
import { Row, Col, Image, InputNumber } from 'antd';
import ProductImg from '../../assets/images/productImg/AlbedMain.jpg'
import ProductImgSmall from '../../assets/images/productImg/Albed2.jpg'
import { WarpperName, WarpperPrice, WarpperQuantity, WarpperSmallImage } from './style';
import { StarFilled, PlusOutlined, MinusOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import ButtonComponent from '../ButtonComponent/ButtonComponent';

const ProductDetailComponent = () => {
    const onChange = () => { }
    return (
        <Row style={{ padding: '16px', backgroundColor: '#fff', borderRadius: '10px' }}>
            <Col span={10}>
                <Image src={ProductImg} alt="img product" preview={false}></Image>
                <Row style={{ paddingTop: '10px' }}>
                    <Col span={4}><WarpperSmallImage src={ProductImgSmall} alt='small img' preview={false} /></Col>
                    <Col span={4}><WarpperSmallImage src={ProductImgSmall} alt='small img' preview={false} /></Col>
                    <Col span={4}><WarpperSmallImage src={ProductImgSmall} alt='small img' preview={false} /></Col>
                    <Col span={4}><WarpperSmallImage src={ProductImgSmall} alt='small img' preview={false} /></Col>
                    <Col span={4}><WarpperSmallImage src={ProductImgSmall} alt='small img' preview={false} /></Col>
                    <Col span={4}><WarpperSmallImage src={ProductImgSmall} alt='small img' preview={false} /></Col>
                </Row>
            </Col>
            <Col span={14} style={{ padding: '22px' }}>
                <WarpperName>Mô hình Albedo trong phim hoạt hình OverLord</WarpperName>
                <h4 >
                    <StarFilled style={{ fontSize: '20px', color: 'rgb(253,216,54)' }} />
                    <StarFilled style={{ fontSize: '20px', color: 'rgb(253,216,54)' }} />
                    <StarFilled style={{ fontSize: '20px', color: 'rgb(253,216,54)' }} />
                    <StarFilled style={{ fontSize: '20px', color: 'rgb(253,216,54)' }} />
                    <StarFilled style={{ fontSize: '20px', color: 'rgb(253,216,54)' }} />
                </h4>
                <WarpperPrice>
                    1,000,000
                </WarpperPrice>
                <WarpperQuantity>
                    <div>Số lượng: </div>
                    <div style={{ display: 'flex', flexDirection: 'row', gap: '5px' }}>
                        <ButtonComponent
                            icon={<PlusOutlined />}
                        />
                        <InputNumber min={1} max={10} defaultValue={1} onChange={onChange} />
                        <ButtonComponent
                            icon={<MinusOutlined />}
                        />
                    </div>
                </WarpperQuantity>
                <div style={{ marginTop: '20px' }}>
                    <ButtonComponent
                        size={20}
                        icon={<ShoppingCartOutlined />}
                        styleButton={{ backgroundColor: '#72af5c', color: 'white', borderRadius: '6px', width: '250px', height: '50px', fontSize: '18px', fontWeight: '500' }}
                        textButton={'Thêm vào giỏ hàng'}
                    />
                </div>
            </Col>
        </Row>
    )
}

export default ProductDetailComponent