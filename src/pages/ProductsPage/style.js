import { Col } from "antd";
import styled from "styled-components";

export const WrapperProduct = styled(Col)`
    display:  flex;
    flex-direction: column;
    gap: 15px;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    align-content: center;
`
export const WarrperProductChild = styled(Col)`
    display: flex;
    justify-content: space-around;
`