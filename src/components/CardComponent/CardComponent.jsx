import { Card, Image } from 'antd';
import React from 'react';
import { StyleNameProduct, WrapperPriceText, WrapperReportText } from './style';
import { StarFilled } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom'




export const CardComponent = (props) => {
    const { name, image, type, price, countInStock, rating, description, id } = props;

    const navigate = useNavigate()
    const StarRating1 = (rating) => {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;

        const stars = Array.from({ length: fullStars }, (_, index) => (
            <StarFilled key={index} style={{ fontSize: '14px', color: '#ffc400' }} />
        ));

        if (hasHalfStar) {
            stars.push(
                <StarFilled
                    key={fullStars}
                    style={{ fontSize: '14px', color: '#ffc400', clipPath: 'polygon(0 0, 50% 0, 50% 100%, 0 100%)' }}
                />
            );
        }

        return <div>{stars}</div>;
    };
    const formattedAmount = price.toLocaleString('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });
    const handleDetailProduct = (id) => {
        // console.log(id)
        navigate(`/product-detail/${id}`)
    }
    // console.log(formattedAmount)
    return (
        <Card
            hoverable
            // headStyle={{width: '200px', height: '200px'}}
            style={{ width: 240 }}
            bodyStyle={{ padding: '10px' }}
            cover={
                <div style={{ overflow: "hidden", height: "240px" }}>
                    <Image src={image} preview={false} alt="img product" style={{ objectFit: 'cover' }} ></Image>
                </div>
            }
            onClick={() => handleDetailProduct(id)}
        >
            <StyleNameProduct>{name}</StyleNameProduct>
            <WrapperReportText>
                <span style={{ marginRight: '4px' }}>{rating}</span>
                {StarRating1(rating)}
            </WrapperReportText>
            <WrapperPriceText>{formattedAmount}</WrapperPriceText>
        </Card>
    );
};
export default CardComponent