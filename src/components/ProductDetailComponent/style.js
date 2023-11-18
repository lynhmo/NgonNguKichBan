import { Image } from 'antd';
import styled from "styled-components";

export const WarpperSmallImage = styled(Image)`
    height: 64px;
    width: 64px;
`


export const WarpperName = styled.span`
   color: rgb(36,36,36);
   font-size: 30px;
   font-weight: 400;
   line-height: 32px;
   word-break: break-word;
`
export const WarpperPrice = styled.h4`
    font-size: 30px;
    font-weight: 600;
`

export const WarpperQuantity = styled.div`
    font-size: 18px;  
    display: flex;
    flex-direction: row;
    gap: 20px;
`