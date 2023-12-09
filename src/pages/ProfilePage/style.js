import styled from "styled-components";
import { Upload } from 'antd';

export const WarpperProfilePage = styled.div`
    padding: 0 120px 50px 120px;
    background-color: #efefef;
`

export const GoHome = styled.div`
    padding: 20px  20px 20px 5px;
    width: max-content;
    color: #000;
    font-size: 20px;
    cursor: pointer;
    &:hover{
        background-color: #efefef;
        text-decoration: underline;
    }
`
export const ContentProfilePage = styled.div`
    display:flex;
    justify-content: center;
    gap: 50px;
`

export const TitleProfilePage = styled.div`
    font-size: 30px;
    font-weight: 500;
    padding: 20px 10px;
    border-bottom: 1px black solid;
    margin-bottom:10px;
    display:flex;
    justify-content: space-between;
`
export const UserLabelDetail = styled.div`
    padding: 10px 0;
`

export const WrapperUploadFile = styled(Upload)`
    margin-top: 20px;
    & .ant-upload-list {
        display: none;
    }
`
export const ContentDetailUser = styled.div`
    width: 200px;
`
export const Avatar = styled.div`
    display:flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
`