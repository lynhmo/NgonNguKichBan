import { Checkbox, InputNumber } from "antd";
import styled from "styled-components";

export const WrapperStyleHeader = styled.div`
  background: rgb(255, 255, 255);
  padding: 9px 16px;
  border-radius: 7px;
  display: flex;
  align-items: center;
  span {
    color: rgb(36, 36, 36);
    font-weight: 400;
    font-size: 13px;
  }
`
export const WrapperStyleHeaderDilivery = styled.div`
  background: rgb(255, 255, 255);
  padding: 9px 16px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  span {
    color: rgb(36, 36, 36);
    font-weight: 400;
    font-size: 13px;
  };
  margin-bottom: 10px;
`

export const WrapperLeft = styled.div`
  width: 900px;
`

export const WrapperListOrder = styled.div`

`

export const WrapperItemOrder = styled.div`
  display: flex;
  align-items: center;
  padding: 9px 16px;
  background: #fff;
  margin-top: 12px;
  border-radius:10px;
`

export const WrapperPriceDiscount = styled.span`
  color: #999;
  font-size: 12px;
  text-decoration: line-through;
  margin-left: 4px;
`
export const WrapperCountOrder = styled.div`
  display: flex;
  align-items: center;
  width: 84px;
  border: 1px solid #ccc;
  border-radius: 4px;
`

export const WrapperRight = styled.div`
  width: 320px;
  margin-left: 20px;
  display: flex ;
  flex-direction: column; 
  /* gap: 10px;  */
  /* align-items: center; */
`

export const WrapperInfo = styled.div`
  padding: 15px 15px;
  border-bottom: 1px solid #f5f5f5;
  background: #fff;
  border-radius:10px;
  width: 90%;
  margin-bottom: 10px;
`

export const WrapperTotal = styled.div`
  display: flex;
  align-items: flex-start; 
  justify-content: space-between;
  padding: 17px 20px;
  background: #fff ;
  border-bottom-right-radius: 6px;
  border-bottom-left-radius: 6px;
`

export const CustomCheckbox = styled(Checkbox)`
  .ant-checkbox-checked .ant-checkbox-inner {
    background-color: #397224;
    border-color: #397224;
  }
  .ant-checkbox:hover .ant-checkbox-inner {
    border-color: #004b00;
  }
`
export const WrapperInputNumber = styled(InputNumber)`
    &.ant-input-number.ant-input-number-sm {
        width: 40px;
        border-top: none;
        border-bottom: none;
        .ant-input-number-handler-wrap {
            display: none !important;
        }
    };
`