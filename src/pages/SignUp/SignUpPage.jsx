import React from 'react'
import InputForm from '../../components/InputForm/InputForm'
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
import { Image } from 'antd';
import smallLogo from "../../assets/images/small_logo1.png"
import Logo from "../../assets/images/Logo.png"
import { WarpperSignUpLeft, WarpperSignUpRight, WarpperTitle, WarpperButton } from './style';

const SignUp = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'row', backgroundColor: '#dbe4d8', height: '100vh', justifyContent: 'space-around' }}>
      <WarpperSignUpLeft>
        <a href="/">
          <Image src={smallLogo} preview={false} height='250px'></Image>
          <Image src={Logo} preview={false}></Image>
        </a>
      </WarpperSignUpLeft>
      <WarpperSignUpRight>
        <WarpperTitle>Đăng ký tài khoản</WarpperTitle>
        <div>
          <span>Tai khoan</span>
          <InputForm placeholder={'Tai khoan'} />
          <span>Mat khau</span>
          <InputForm placeholder={'Mat khau'} />
          <span>Nhap lai mat khau</span>
          <InputForm placeholder={'Nhap lai mat khau'} />
        </div>
        <WarpperButton>
          <ButtonComponent
            size={20}
            // icon={ }
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
            <a href="/sign-in" style={{ marginLeft: '5px' }}>
              Đăng nhập tại đây
            </a>
          </div>

        </WarpperButton>
      </WarpperSignUpRight>
    </div>
  )
}

export default SignUp