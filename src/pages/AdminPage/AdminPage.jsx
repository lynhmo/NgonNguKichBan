import React, { useState } from 'react'
import { Menu } from 'antd';
import { AppstoreOutlined, UserOutlined } from '@ant-design/icons';
import { getItem } from '../../utils'
import HeaderComponent from '../../components/HeaderComponent/HeaderComponent';
import AdminUser from '../../components/AdminUser/AdminUser';
import AdminProduct from '../../components/AdminProduct/AdminProduct';



const AdminPage = () => {
    const [keySelected, setKeyslected] = useState('')
    var menuTextSize = 18
    const renderPage = (key) => {
        switch (key) {
            case 'user':
                return (
                    <AdminUser />
                )
            case 'product':
                return (
                    <AdminProduct />
                )
            default:
                return <AdminUser />
        }
    }

    const items = [
        getItem('User Manager', 'user', <UserOutlined style={{ fontSize: menuTextSize }} />),
        getItem('Product Manager', 'product', <AppstoreOutlined style={{ fontSize: menuTextSize }} />)
    ];
    const handleMenu = ({ key }) => {
        setKeyslected(key)
    }


    return (
        <>
            <HeaderComponent isHiddenSearch isHiddenCart isAdminPage />
            <div style={{ display: 'flex', height: '100vh' }}>
                <Menu
                    mode="inline"
                    style={{ width: 256, boxShadow: '1px 1px 2px #ccc', fontSize: menuTextSize }}
                    items={items}
                    onClick={handleMenu}
                />
                <div style={{ flex: 1 }} >
                    {renderPage(keySelected)}
                </div>
            </div >
        </>
    )
}

export default AdminPage