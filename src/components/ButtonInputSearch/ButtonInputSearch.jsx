import React from 'react'
import { Button, Input } from 'antd'
import { SearchOutlined } from '@ant-design/icons'

const ButtonInputSearch = (props) => {
    const { size, placeholder, textButton } = props
    return (
        <div style={{ display: 'flex' }}>
            <Input size={size} placeholder={placeholder} bordered={false} style={{ backgroundColor: 'white', borderRadius: '0' }} />
            <Button size={size} bordered={false} icon={<SearchOutlined />} style={{ borderRadius: '0' }}> {textButton}</Button>
        </div >
    )
}

export default ButtonInputSearch