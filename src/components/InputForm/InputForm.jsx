import React, { useState } from 'react'
import { Input } from 'antd'
const InputForm = (props) => {
    const [valueInput, setValueInput] = useState('')
    const { placeholder = ' Nhap text', ...rests } = props
    return (
        <Input placeholder={placeholder} valueInput={valueInput} {...rests} style={{}} />
    )
}

export default InputForm