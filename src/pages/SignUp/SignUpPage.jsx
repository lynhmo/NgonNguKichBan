import React, { useEffect, useState } from 'react'
import InputForm from '../../components/InputForm/InputForm'
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
import { Image } from 'antd';
import smallLogo from "../../assets/images/small_logo1.png"
import Logo from "../../assets/images/Logo.png"
import { WarpperSignUpLeft, WarpperSignUpRight, WarpperTitle, WarpperButton } from './style';
import { EyeFilled, EyeInvisibleFilled } from '@ant-design/icons'

import * as UserService from '../../services/UserService'
import { useMutaionHook } from '../../hooks/useMutationHook';
import LoadingComponent from '../../components/LoadingComponent/LoadingComponent';

import * as AlertMessage from '../../components/Message/Message'

import { useNavigate } from 'react-router-dom'


const SignUp = () => {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setconfirmPassword] = useState('')

  const [isShowPassword, setIsShowPassword] = useState(false)
  const [isShowCofPassword, setIsShowCofPassword] = useState(false)

  const mutation = useMutaionHook(
    data => UserService.signupUser(data)
  )
  const { data, isPending } = mutation

  const hanldeSignUp = () => {
    mutation.mutate({
      email,
      password,
      confirmPassword
    })
  }

  useEffect(() => {
      if (mutation.data?.status === 'OK') {
        AlertMessage.success()
        mutation.data.status = undefined
        handleNavigationSignIn()
      } else if (mutation.data?.status === 'ERR') {
        AlertMessage.error()
        mutation.data.status = undefined
      }
  })

  const handleOnchangeEmail = (value) => {
    setEmail(value)
  }
  const handleOnchangePassword = (value) => {
    setPassword(value)
  }
  const handleOnchangeConfirmPassword = (value) => {
    setconfirmPassword(value)
  }
  const handleNavigationSignIn = () => {
    navigate('/sign-in')
  }


  return (
    <div style={{ display: 'flex', flexDirection: 'row', backgroundColor: '#dbe4d8', height: '100vh', justifyContent: 'space-around' }}>
      <WarpperSignUpLeft>
        <a href="/">
          <Image src={smallLogo} preview={false} height='250px'></Image>
          <Image src={Logo} preview={false}></Image>
        </a>
      </WarpperSignUpLeft>
      <WarpperSignUpRight>
        <WarpperTitle>Đăng Ký</WarpperTitle>
        <div>
          <p>Tài Khoản</p>
          <InputForm placeholder={'Email'} value={email} onChange={handleOnchangeEmail} />

          <p>Mật Khẩu</p>
          <div style={{ position: 'relative' }}>
            <span onClick={() => setIsShowPassword(!isShowPassword)} style={{ zIndex: 10, position: 'absolute', top: '4px', right: '8px', cursor: 'pointer' }}>
              {isShowPassword ? (<EyeFilled />) : (<EyeInvisibleFilled />)}
            </span>
            <InputForm placeholder={'Mat khau'} value={password} onChange={handleOnchangePassword} type={isShowPassword ? "text" : "password"} />
          </div>

          <p>Nhập lại mật khẩu</p>
          <div style={{ position: 'relative' }}>
            <span onClick={() => setIsShowCofPassword(!isShowCofPassword)} style={{ zIndex: 10, position: 'absolute', top: '4px', right: '8px', cursor: 'pointer' }}>
              {isShowCofPassword ? (<EyeFilled />) : (<EyeInvisibleFilled />)}
            </span>
            <InputForm placeholder={'Nhap lai mat khau'} value={confirmPassword} onChange={handleOnchangeConfirmPassword} type={isShowCofPassword ? "text" : "password"} />
          </div>

        </div>
        {data?.status === 'ERR' && <span style={{ color: 'red' }}>{data?.message}</span>}
        <LoadingComponent isPending={isPending}>
          <WarpperButton>
            <ButtonComponent
              disabled={!email.length || !password.length || !confirmPassword.length}
              size={20}
              onClick={hanldeSignUp}
              styleButton={{
                backgroundColor: '#72af5c',
                color: 'white',
                borderRadius: '6px',
                width: '100%',
                height: '50px',
                fontSize: '18px',
                fontWeight: '500'
              }}
              textButton={'Tạo tài khoản'}
            />
            <div>
              <span>
                Đã có tài khoản?
              </span>
              <span
                onClick={handleNavigationSignIn}
                style={{ color: '#1677ff', marginLeft: '5px', fontWeight: '600', cursor: 'pointer' }}
              >
                Đăng nhập tại đây
              </span>
            </div>

          </WarpperButton>
        </LoadingComponent>
      </WarpperSignUpRight>
    </div>
  )
}

export default SignUp