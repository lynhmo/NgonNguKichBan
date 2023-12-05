// import { SearchOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import React from 'react'

const ButtonComponent = ({ size, textButton, styleButton, styleTextButton, disabled, ...rests }) => {
    return (
        <Button
            size={size}
            style={{
                ...styleButton,
                background: disabled ? '#ccc' : styleButton.backgroundColor
            }}
            {...rests}
        >
            <span style={styleTextButton}>{textButton}</span>
        </Button>

    )
}

export default ButtonComponent