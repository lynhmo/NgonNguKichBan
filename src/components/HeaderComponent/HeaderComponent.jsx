import React, { useEffect, useState } from "react";
import { Col, Popover, message } from "antd";
import { WrapperAccount, WrapperHeader, WrapperTextHeader, AccountText, AccountPopup, AccountPopupChild, CartText } from "./style";
import { UserOutlined, CaretDownOutlined, ShoppingCartOutlined, LogoutOutlined } from '@ant-design/icons';
import ButtonInputSearch from "../ButtonInputSearch/ButtonInputSearch";
import { useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import * as UserService from "../../services/UserService"
import { resetUser } from '../../redux/slides/userSlide';
import { searchProduct } from '../../redux/slides/productSlide'
import Loading from '../Loading/Loading';
import BigLogo from '../../assets/images/Logo.png';

const HeaderComponent = ({ isHiddenSearch = false, isHiddenCart = false, isAdminPage = false }) => {
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState('')
  const location = useLocation()
  const order = useSelector((state) => state.order)
  const navigate = useNavigate()
  const handleNavigateLogin = () => {
    navigate('/sign-in')
  }
  const handleNavigateProfile = () => {
    navigate('/profile')
  }
  const user = useSelector((state) => state.user)

  const dispatch = useDispatch()
  // const [loading, setLoading] = useState(false)

  const handleLogout = async () => {
    await UserService.logoutUser()
    dispatch(resetUser())
    // Xoa accesstoken khi logout khoi localStogare
    localStorage.removeItem('access_token')
    LogoutMessage()
    if (location?.pathname) {
      navigate(location?.pathname)
    } else {
      navigate('/')
    }
  }

  const [messageApi, contextHolder] = message.useMessage();
  const LogoutMessage = () => {
    messageApi.info({
      type: 'info',
      content: 'You have been logout!',
      duration: 2,
    })
  }
  const content = (
    <div>
      <AccountPopupChild onClick={handleNavigateProfile}>Profile Page</AccountPopupChild>
      {user?.isAdmin && (<AccountPopupChild onClick={() => { navigate('/admin') }}>Admin</AccountPopupChild >)}
      {isAdminPage && (<AccountPopupChild onClick={() => { navigate('/') }}>Go back main page</AccountPopupChild >)}
      <AccountPopupChild style={{ cursor: 'pointer', color: 'red' }} onClick={handleLogout}>
        Logout
        <LogoutOutlined style={{ marginLeft: '5px' }} />
      </AccountPopupChild>
    </div>
  )
  const [username, setUsername] = useState('')
  const [avatar, setAvatar] = useState('')
  useEffect(() => {
    setLoading(true)
    setUsername(user?.name)
    setAvatar(user?.avatar)
    setLoading(false)
  }, [user?.name, user?.avatar])

  const onSearch = (e) => {
    setSearch(e.target.value)
    dispatch(searchProduct(e.target.value))
  }

  return (
    <div>
      {/* this is for logout message */}
      {contextHolder}
      <WrapperHeader>
        <Col span={7}>
          <WrapperTextHeader onClick={() => { navigate('/') }}>
            <img src={BigLogo} alt="logo" width={300} style={{ objectFit: 'cover' }} />
          </WrapperTextHeader>
        </Col>
        <Col span={10}>
          {!isHiddenSearch && (
            <ButtonInputSearch
              size='large'
              placeholder='Search'
              textButton='Search'
              onChange={onSearch}
            />
          )}
        </Col>
        <Col span={7}>
          <WrapperAccount>
            <AccountText style={{ margin: '0' }}>
              {avatar ? (
                <img src={avatar} alt="avatar" style={{
                  height: '50px',
                  width: '50px',
                  borderRadius: '50%',
                  objectFit: 'cover'
                }} />
              ) : (
                <UserOutlined style={{ fontSize: '30px' }} />
              )}
            </AccountText>
            <Loading isLoading={loading}>
              <AccountText >
                {user?.access_token ? (
                  <div>
                    <div style={{ fontSize: '18px' }}>{username?.length ? username : user?.email}</div>
                    <AccountPopup>
                      {/* POPUP ACCOUNT */}
                      <Popover content={content} title="Tai khoan" trigger="click" >
                        <span>Account</span>
                        <CaretDownOutlined />
                      </Popover>
                    </AccountPopup>
                  </div>
                ) : (
                  <div onClick={handleNavigateLogin} style={{ textDecoration: 'none', color: '#fff', cursor: 'pointer' }} >
                    SignIn/ SignOut
                  </div>
                )}
              </AccountText>

            </Loading>


            {!isHiddenCart && user?.access_token && (
              <AccountText className="Cart" onClick={() => { navigate('/order') }}>
                <CartText>
                  <ShoppingCartOutlined style={{ fontSize: '30px' }} />
                  <span style={{ marginLeft: '10px' }}>Cart</span>
                  /
                  <span>{order?.orderItems?.length}</span>
                </CartText>
              </AccountText>
            )}

          </WrapperAccount>
        </Col>
      </WrapperHeader>
    </div >
  );
};

export default HeaderComponent;
