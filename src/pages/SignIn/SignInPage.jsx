import React, { useEffect, useState } from 'react'
import { WarpperButton, WarpperSginInLeft, WarpperSginInRight, WarpperTitle } from './style'
import InputForm from '../../components/InputForm/InputForm'
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
import { Image } from 'antd';
import smallLogo from "../../assets/images/small_logo1.png"
import Logo from "../../assets/images/Logo.png"
import { EyeFilled, EyeInvisibleFilled } from '@ant-design/icons'
import * as UserService from '../../services/UserService'
import { useMutationHook } from '../../hooks/useMutationHook';
import LoadingComponent from '../../components/LoadingComponent/LoadingComponent';
import { useNavigate, useLocation } from 'react-router-dom'
import * as AlertMessage from '../../components/Message/Message'
import { jwtDecode } from "jwt-decode";
import { useDispatch } from 'react-redux'
import { updateUser } from '../../redux/slides/userSlide';


const SignIn = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isShowPassword, setIsShowPassword] = useState(false)
  const dispatch = useDispatch()
  const location = useLocation()
  const mutation = useMutationHook(
    data => UserService.loginUser(data)
  )
  const { data, isPending } = mutation
  const hanldeSignIn = () => {
    mutation.mutate({
      email,
      password
    })
  }
  useEffect(() => {
    if (mutation.data?.status === 'OK') {
      if (location?.state) {
        navigate(location?.state)
      } else {
        navigate('/')
      }
      AlertMessage.success("Đăng nhập thành công!")
      mutation.data.status = undefined
      localStorage.setItem('access_token', JSON.stringify(data?.access_token))

      if (data?.access_token) {
        const decoded = jwtDecode(data?.access_token);
        // console.log("data?.access_token: ", data?.access_token);
        if (decoded?.id) {
          handleGetDetailUser(decoded?.id, data?.access_token)
        }
      }
    } else if (mutation.data?.status === 'ERR') {
      AlertMessage.error()
      mutation.data.status = undefined
    }
  })

  const handleGetDetailUser = async (id, token) => {
    const res = await UserService.getDetailUser(id, token)
    dispatch(updateUser({ ...res?.data, access_token: token }))
  }

  const handleOnchangeEmail = (value) => {
    setEmail(value)
  }
  const handleOnchangePassword = (value) => {
    setPassword(value)
  }
  const handleNavigationSignUp = () => {
    navigate('/sign-up')
  }
  const handleKeyDownEnter = (event) => {
    if (event.key === 'Enter') {
      hanldeSignIn()
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'row', backgroundColor: '#dbe4d8', height: '100vh', justifyContent: 'space-around' }}>
      <WarpperSginInLeft>
        <a href="/">
          <Image src={smallLogo} preview={false} height='250px'></Image>
          <Image src={Logo} preview={false}></Image>
        </a>
      </WarpperSginInLeft>
      <WarpperSginInRight>
        <WarpperTitle>Đăng Nhập</WarpperTitle>
        <div>
          {/* <span>Tài khoản</span>
          <InputForm placeholder={'Tài khoản'} />
          <span>Mật Khẩu</span>
          <InputForm placeholder={'Mat khau'} /> */}

          <p>Tài khoản</p>
          <InputForm
            placeholder={'Email'}
            value={email}
            onChange={handleOnchangeEmail}
            autoFocus
          />

          <p>Mật Khẩu</p>
          <div style={{ position: 'relative' }}>
            <span
              onClick={() => setIsShowPassword(!isShowPassword)}
              style={{ zIndex: 10, position: 'absolute', top: '4px', right: '8px', cursor: 'pointer' }}>
              {isShowPassword ? (<EyeFilled />) : (<EyeInvisibleFilled />)}
            </span>
            <InputForm
              placeholder={'Mat khau'}
              value={password}
              onChange={handleOnchangePassword}
              type={isShowPassword ? "text" : "password"}
              onKeyDown={handleKeyDownEnter}

            />
          </div>

        </div>
        {data?.status === 'ERR' && <span style={{ color: 'red' }}>{data?.message}</span>}
        <LoadingComponent isPending={isPending}>
          <WarpperButton >
            <ButtonComponent
              disabled={!email.length || !password.length}
              size={20}
              onClick={hanldeSignIn}
              styleButton={{ backgroundColor: '#72af5c', color: 'white', borderRadius: '6px', width: '100%', height: '50px', fontSize: '18px', fontWeight: '500' }}
              textButton={'Đăng nhập'}
            />
            <div>
              <span>
                Chưa có tài khoản?
              </span>
              <span
                onClick={handleNavigationSignUp}
                style={{ color: '#1677ff', marginLeft: '5px', fontWeight: '600', cursor: 'pointer' }}
              >
                Đăng ký tại đây
              </span>
            </div>
          </WarpperButton>
        </LoadingComponent>
      </WarpperSginInRight>
    </div>
  )
}

export default SignIn