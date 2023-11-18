import React from 'react'
import { WarpperButton, WarpperSginInLeft, WarpperSginInRight, WarpperTitle } from './style'
import InputForm from '../../components/InputForm/InputForm'
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
import { Image } from 'antd';
import smallLogo from "../../assets/images/small_logo1.png"
import Logo from "../../assets/images/Logo.png"
const SignIn = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'row', backgroundColor: '#dbe4d8', height: '100vh', justifyContent: 'space-around' }}>
      <WarpperSginInLeft>
        <a href="/">
          <Image src={smallLogo} preview={false} height='250px'></Image>
          <Image src={Logo} preview={false}></Image>
        </a>
      </WarpperSginInLeft>
      <WarpperSginInRight>
        <WarpperTitle>Đăng nhập tài khoản</WarpperTitle>
        <div>
          <span>Tai khoan</span>
          <InputForm placeholder={'Tai khoan'} />
          <span>mat khau</span>
          <InputForm placeholder={'Mat khau'} />
        </div>
        <WarpperButton>
          <ButtonComponent
            size={20}
            // icon={ }
            styleButton={{ backgroundColor: '#72af5c', color: 'white', borderRadius: '6px', width: '100%', height: '50px', fontSize: '18px', fontWeight: '500' }}
            textButton={'Đăng nhập'}
          />
          <div>
            <span>
              Chưa có tài khoản?
            </span>
            <a href="/sign-up" style={{ marginLeft: '5px' }}>
              Đăng ký tại đây
            </a>
          </div>
        </WarpperButton>
      </WarpperSginInRight>
    </div>
  )
}

export default SignIn