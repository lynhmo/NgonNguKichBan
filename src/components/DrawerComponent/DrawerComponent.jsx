import React from 'react';
import { Drawer } from 'antd';

const DrawerComponent = ({ title = 'Drawer', placement = 'right', isOpen = false, children, size, ...rests }) => {
    return (
        <>
            <Drawer title={title} placement={placement} open={isOpen} size={size} {...rests}>
                {children}
            </Drawer>
        </>
    )
}

export default DrawerComponent