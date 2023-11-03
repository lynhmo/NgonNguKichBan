import { Input } from 'antd'
import React from 'react'

const InputComponent = ({ size, placeholder }) => {
    return (
        <Input size={size} placeholder={placeholder} bordered={false} style={{ backgroundColor: 'white', borderRadius: '0' }} />
    )
}

export default InputComponent