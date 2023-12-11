import React, { useEffect, useState } from "react";
import { Col, Popover, message } from "antd";
import { WrapperAccount, WrapperHeader, WrapperTextHeader, AccountText, AccountPopup, AccountPopupChild } from "./style";
import { UserOutlined, CaretDownOutlined, ShoppingCartOutlined, LogoutOutlined } from '@ant-design/icons';
import ButtonInputSearch from "../ButtonInputSearch/ButtonInputSearch";
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import * as UserService from "../../services/UserService"
import { resetUser } from '../../redux/slides/userSlide';
import Loading from '../Loading/Loading';

const HeaderComponent = ({ isHiddenSearch = false, isHiddenCart = false, isAdminPage = false }) => {
  const [loading, setLoading] = useState(false)

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
    navigate('/')
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

  return (
    <div>
      {/* this is for logout message */}
      {contextHolder}
      <WrapperHeader>
        <Col span={4}>
          <WrapperTextHeader onClick={() => { navigate('/') }}>BOTSTORE</WrapperTextHeader>
        </Col>
        <Col span={13}>
          {!isHiddenSearch && (
            <ButtonInputSearch
              size='large'
              placeholder='Search'
              textButton='Search'
            />
          )}
        </Col>
        <Col span={7}>
          <WrapperAccount>
            <AccountText style={{ margin: '0' }}>
              {avatar ? (
                <img src={avatar} alt="avatar" style={{
                  height: '60px',
                  width: '60px',
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
            {!isHiddenCart && (
              <AccountText className="Cart">
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                  <ShoppingCartOutlined style={{ fontSize: '30px' }} />
                  <span style={{ marginLeft: '10px' }}>Cart</span>
                </div>
              </AccountText>
            )}

          </WrapperAccount>
        </Col>
      </WrapperHeader>
    </div >
  );
};

export default HeaderComponent;
