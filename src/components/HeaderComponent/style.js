import { Row } from "antd";
import styled from "styled-components"

export const WrapperHeader = styled(Row)`
    padding: 20px 10%;
    background-color: #397224;
    align-items: center;
`

export const WrapperTextHeader = styled.span`
    font-size: 30px;
    color: #fff;
    font-weight: bold;
    text-align: left;
    cursor: pointer;
`

export const WrapperAccount = styled.div`
    font-size: 18px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
`
export const AccountText = styled.div`
    margin: 0 15px;
    color: #fff;
`

export const AccountPopup = styled.div`
    font-size: 18px;
    cursor: pointer;
    &:hover{
        text-decoration: underline;
    }
`

export const AccountPopupChild = styled.div`
    cursor: pointer;
    margin: 10px 0;
    &:hover{
        background-color: #EFEFEF;
    }
`