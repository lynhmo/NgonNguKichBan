import { Card, Image } from 'antd';
import React from 'react';
import { StyleNameProduct, WrapperPriceText, WrapperReportText } from './style';
import { StarFilled } from '@ant-design/icons';
import zero2 from '../../assets/images/02.jpeg';

export const CardComponent = (props) => {
    const { name, image, type, price, countInStock, rating, description } = props;

    const StarRating = (numberOfStars) => {
        const stars = Array.from({ length: numberOfStars }, (_, index) => <StarFilled key={index} style={{ fontSize: '14px', color: '#ffc400' }} />);
        return (
            <div>
                {stars}
            </div>
        );
    };
    return (
        <Card
            hoverable
            // headStyle={{width: '200px', height: '200px'}}
            style={{ width: 240 }}
            bodyStyle={{ padding: '10px' }}
            cover={<Image src={zero2} preview={false}></Image>}
        >
            <StyleNameProduct>{name}</StyleNameProduct>
            <WrapperReportText>
                <span style={{ marginRight: '4px' }}>{rating}</span>
                {/* <StarFilled style={{ fontSize: '14px', color: '#ffc400' }} /> */}
                {StarRating(rating)}
            </WrapperReportText>
            <WrapperPriceText>{price}đ</WrapperPriceText>
        </Card>
    );
};
export default CardComponent