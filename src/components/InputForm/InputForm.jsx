import React from 'react'
import { Input } from 'antd'
const InputForm = (props) => {
    const { placeholder = ' Nhap text', ...rests } = props
    const handleOnchangeInput = (e) => {
        props.onChange(e.target.value)
    }
    return (
        <Input
            placeholder={placeholder}
            value={props.value}
            {...rests}
            onChange={handleOnchangeInput}
        />
    )
}

export default InputForm