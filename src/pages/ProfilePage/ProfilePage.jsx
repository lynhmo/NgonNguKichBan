import React, { useEffect, useState } from 'react'
import { Avatar, ContentDetailUser, ContentProfilePage, GoHome, TitleProfilePage, UserLabelDetail, WarpperProfilePage, WrapperUploadFile } from './style'
import { UploadOutlined, ArrowLeftOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import InputForm from '../../components/InputForm/InputForm'
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
import { useDispatch, useSelector } from 'react-redux'
import { useMutationHook } from '../../hooks/useMutationHook';
import * as UserService from '../../services/UserService'
import * as AlertMessage from '../../components/Message/Message'
import { updateUser } from '../../redux/slides/userSlide'
// import Loading from '../../components/Loading/Loading'
import { Button } from 'antd';
import { getBase64 } from '../../utils'

const ProfilePage = () => {
    const navigate = useNavigate()
    const user = useSelector((state) => state.user)
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [avatar, setAvatar] = useState('')

    useEffect(() => {
        setEmail(user?.email)
        setName(user?.name)
        setAddress(user?.address)
        setPhone(user?.phone)
        setAvatar(user?.avatar)
    }, [user])

    const handleEmailChange = (value) => { setEmail(value) }
    const handleNameChange = (value) => { setName(value) }
    const handlePhoneChange = (value) => { setPhone(value) }
    const handleAddressChange = (value) => { setAddress(value) }
    const handleAvatarChange = async ({ fileList }) => {
        try {
            const file = fileList[0]
            if (!file.url && !file.preview) {
                file.preview = await getBase64(file.originFileObj);
            }
            setAvatar(file.preview)
        } catch (error) {
            AlertMessage.error('Something wrong')
        }
    }
    useEffect(() => {
        try {
            if (isSuccess) {
                AlertMessage.success()
                handleGetDetailUser(user?.id, user?.access_token)
            } else if (isError) {
                AlertMessage.error()
            }
        } catch (error) {

        }
    })

    const mutation = useMutationHook(
        (data) => {
            const { id, access_token, ...rests } = data
            UserService.updateUser(id, access_token, rests)
        }
    )

    const { isError, isSuccess } = mutation

    // Lay data vao mutaion
    const hanldeUpdateUser = () => {
        try {
            mutation.mutate({ id: user?.id, name, email, phone, address, avatar, access_token: user?.access_token })
        } catch (error) {

        }
    }

    const dispatch = useDispatch()
    const handleGetDetailUser = async (id, token) => {
        try {
            const res = await UserService.getDetailUser(id, token)
            dispatch(updateUser({ ...res?.data, access_token: token }))
        } catch (error) {

        }
    }


    return (
        <div>
            <div style={{ padding: '0 120px' }}>
                <GoHome onClick={() => { navigate('/') }}>
                    <ArrowLeftOutlined />
                    <span style={{ marginLeft: '20px' }}>Go back to home page</span>
                </GoHome>
            </div>
            <WarpperProfilePage>
                <TitleProfilePage>
                    <div> Your profile </div>
                    <ButtonComponent
                        size={20}
                        onClick={hanldeUpdateUser}
                        styleButton={{
                            backgroundColor: '#72af5c',
                            color: 'white',
                            borderRadius: '6px',
                            width: '20%',
                            height: '50px',
                            fontSize: '18px',
                            fontWeight: '500'
                        }}
                        textButton={'Cập nhật thông tin'}
                    />
                </TitleProfilePage>
                <ContentProfilePage>
                    <ContentDetailUser>
                        <div>
                            <UserLabelDetail>Email</UserLabelDetail>
                            <InputForm value={email} onChange={handleEmailChange} placeholder={'example@email.com'} />
                        </div>
                        <div>
                            <UserLabelDetail>Name</UserLabelDetail>
                            <InputForm value={name} onChange={handleNameChange} placeholder={'Username'} />
                        </div>
                        <div>
                            <UserLabelDetail>Phone</UserLabelDetail>
                            <InputForm value={phone} onChange={handlePhoneChange} placeholder={'Phone'} />
                        </div>
                        <div>
                            <UserLabelDetail>Address</UserLabelDetail>
                            <InputForm value={address} onChange={handleAddressChange} placeholder={'Address'} />
                        </div>
                    </ContentDetailUser>
                    <Avatar>
                        <UserLabelDetail>Avatar</UserLabelDetail>
                        {avatar && (
                            <img src={avatar} alt='avatar' style={{
                                height: '100px',
                                width: '100px',
                                borderRadius: '10px',
                                objectFit: 'cover'
                            }} />
                        )}
                        <WrapperUploadFile onChange={handleAvatarChange} maxCount={1} >
                            <Button icon={<UploadOutlined />}>Select File</Button>
                        </WrapperUploadFile>
                    </Avatar>
                </ContentProfilePage>
            </WarpperProfilePage>
        </div >
    )
}

export default ProfilePage