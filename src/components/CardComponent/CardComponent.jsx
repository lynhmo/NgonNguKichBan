import { Card, Image } from 'antd'
import React from 'react'
import { StyleNameProduct, WrapperPriceText, WrapperReportText } from './style'
import { StarFilled } from '@ant-design/icons';
import zero2 from '../../assets/images/02.jpeg';

const CardComponent = () => {
    return (
        <Card
            hoverable
            // headStyle={{width: '200px', height: '200px'}}
            style={{ width: 240 }}
            bodyStyle={{ padding: '10px' }}
            cover={<Image src={zero2} preview={false}></Image>}
        >
            <StyleNameProduct>Lego</StyleNameProduct>
            <WrapperReportText><span style={{ marginRight: '4px' }}>4.65</span><StarFilled style={{ fontSize: '14px', color: '#ffc400' }} /></WrapperReportText>
            <WrapperPriceText>19.000.000đ</WrapperPriceText>
        </Card>
    )
}

export default CardComponent