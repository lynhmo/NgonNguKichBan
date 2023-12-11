
import styled from 'styled-components'
import { Upload } from 'antd';

export const WrapperHeader = styled.div`
    color: #000;
    font-size: 25px;
    font-weight: 500;
    padding: 20px;
    background-color: #dbdbdb;
`

export const WrapperUploadFile = styled(Upload)`
    margin-top: 20px;
    & .ant-upload-list {
        display: none;
    }
`