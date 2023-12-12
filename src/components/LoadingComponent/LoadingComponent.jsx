import React from 'react'
import { Spin } from 'antd';
const LoadingComponent = ({ children, isPending, delay = 50 }) => {
    return (

        <Spin spinning={isPending} delay={delay}>
            {children}
        </Spin>
    )
}

export default LoadingComponent