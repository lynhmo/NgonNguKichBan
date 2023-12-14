import { Form, Radio } from 'antd'
import React, { useEffect, useState } from 'react'
import { Lable, WrapperInfo, WrapperLeft, WrapperRadio, WrapperRight } from './style';
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
import { useDispatch, useSelector } from 'react-redux';
import { removeAllOrderProduct } from '../../redux/slides/orderSlide';
import { convertPrice } from '../../utils';
import { useMemo } from 'react';
import ModalComponent from '../../components/ModalComponent/ModalComponent';
import InputComponent from '../../components/InputComponent/InputComponent';
import { useMutationHook } from '../../hooks/useMutationHook';
import * as  UserService from '../../services/UserService'
import * as  OrderService from '../../services/OrderService'
import Loading from '../../components/Loading/Loading';
import * as message from '../../components/Message/Message'
import { updateUser } from '../../redux/slides/userSlide';
import { useNavigate } from 'react-router-dom';

const PaymentPage = () => {
    const order = useSelector((state) => state.order)
    const user = useSelector((state) => state.user)
    const [payment, setPayment] = useState('later_money')
    const [delivery, setDelivery] = useState('GHTK')
    const [isOpenModalUpdateInfo, setIsOpenModalUpdateInfo] = useState(false)
    const [stateUserDetails, setStateUserDetails] = useState({
        name: '',
        phone: '',
        address: '',
    })


    const navigate = useNavigate()
    const [form] = Form.useForm();

    const dispatch = useDispatch()


    useEffect(() => {
        form.setFieldsValue(stateUserDetails)
    }, [form, stateUserDetails])


    //fill the user info in the form
    useEffect(() => {
        if (isOpenModalUpdateInfo) {
            setStateUserDetails({
                name: user?.name,
                address: user?.address,
                phone: user?.phone
            })
        }
    }, [isOpenModalUpdateInfo])




    const handleChangeAddress = () => {
        setIsOpenModalUpdateInfo(true)
    }

    const priceMemo = useMemo(() => {
        const result = order?.orderItemsSlected?.reduce((total, cur) => {
            return total + ((cur.price * cur.amount))
        }, 0)
        return result
    }, [order])

    // calc shipping prices
    const diliveryPriceMemo = useMemo(() => {
        if (priceMemo >= 200000 && priceMemo < 500000) {
            return 10000
        } else if (priceMemo >= 500000 || order?.orderItemsSlected?.length === 0) {
            return 0
        } else {
            return 20000
        }
    }, [priceMemo])

    const totalPriceMemo = useMemo(() => {
        return Number(priceMemo) + Number(diliveryPriceMemo)
    }, [priceMemo, diliveryPriceMemo])


    const handleAddOrder = () => {
        if (user?.access_token && order?.orderItemsSlected && user?.name && user?.address && user?.phone && user?.address && priceMemo && user?.id) {
            mutationAddOrder.mutate({
                token: user?.access_token,
                orderItems: order?.orderItemsSlected,
                fullName: user?.name,
                address: user?.address,
                phone: user?.phone,
                paymentMethod: payment,
                itemsPrice: priceMemo,
                shippingPrice: diliveryPriceMemo,
                totalPrice: totalPriceMemo,
                user: user?.id,
                email: user?.email
            })
        }
    }
    console.log(order)
    const mutationUpdate = useMutationHook(
        (data) => {
            const { id, token, ...rests } = data
            const res = UserService.updateUser(id, token, { ...rests })
            return res
        }
    )
    const mutationAddOrder = useMutationHook(
        (data) => {
            const { token, ...rests } = data
            const res = OrderService.createOrder(token, { ...rests })
            return res
        }
    )

    const { isPending } = mutationUpdate
    const { isPending: isPendingAddOrder, data: dataAddOrder, isSuccess: addOrderSuccess, isError: addOrderError } = mutationAddOrder

    useEffect(() => {
        if (addOrderSuccess && dataAddOrder?.status === 'OK') {
            const arrayOrderSelected = []
            order?.orderItemsSlected.forEach(element => {
                arrayOrderSelected.push(element.product)
            });
            dispatch(removeAllOrderProduct({listChecked: arrayOrderSelected}))
            message.success('Thanh toán thành công')
            navigate('/order-success', {
                state: {
                    delivery, payment, orders: order?.orderItemsSlected
                }
            })
        } else if (addOrderError) {
            message.error('Thanh toán thất bại')

        }
    }, [addOrderSuccess, addOrderError, dataAddOrder])



    const handleDilivery = (e) => {
        setDelivery(e.target.value)
    }
    const handlePayment = (e) => {
        setPayment(e.target.value)
    }
    //cancle form
    const handleCancleUpdate = () => {
        setStateUserDetails({
            name: '',
            email: '',
            phone: '',
            isAdmin: false,
        })
        form.resetFields()
        setIsOpenModalUpdateInfo(false)
    }

    //update the user details
    const handleUpdateInforUser = () => {
        const { name, address, phone } = stateUserDetails
        if (name && address && phone) {
            mutationUpdate.mutate({ id: user?.id, token: user?.access_token, ...stateUserDetails }, {
                onSuccess: () => {
                    dispatch(updateUser({ name, address, phone }))
                    setIsOpenModalUpdateInfo(false)
                }
            })
        }
    }

    const handleOnchangeDetails = (e) => {
        setStateUserDetails({
            ...stateUserDetails,
            [e.target.name]: e.target.value
        })
    }
    return (
        <div style={{ background: '#dbe4d8', with: '100%', minHeight: '100vh', paddingBottom: 30 }}>
            <Loading isLoading={isPendingAddOrder}>
                <div style={{ height: '100%', width: '1270px', margin: '0 auto' }}>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <WrapperLeft>
                            <h4>Đơn hàng đã đặt thành công</h4>
                            <WrapperInfo>
                                <div>
                                    <Lable>Chọn phương thức giao hàng</Lable>
                                    <WrapperRadio onChange={handleDilivery} value={delivery}>
                                        <Radio value="GHTK"><span style={{ color: '#72af5c', fontWeight: 'bold' }} checked>FAST</span> Giao hàng tiết kiệm</Radio>
                                        <Radio value="Gojek"><span style={{ color: '#72af5c', fontWeight: 'bold' }}>GOJEK</span> Giao hàng tiết kiệm</Radio>
                                        <Radio value="NinjaVan"><span style={{ color: '#72af5c', fontWeight: 'bold' }}>NINJA VAN</span> Giao hàng tiết kiệm</Radio>
                                        <Radio value="Grab"><span style={{ color: '#72af5c', fontWeight: 'bold' }}>GRAB</span> Giao hàng hỏa tốc</Radio>
                                    </WrapperRadio>
                                </div>
                            </WrapperInfo>
                            <WrapperInfo>
                                <div>
                                    <Lable>Chọn phương thức thanh toán</Lable>
                                    <WrapperRadio onChange={handlePayment} value={payment} >
                                        <Radio value="later_money" checked> Thanh toán tiền mặt khi nhận hàng</Radio>
                                        <Radio value="paypal"> Thanh toán tiền bằng paypal</Radio>
                                        <Radio value="zalo"> Thanh toán tiền bằng zalo</Radio>
                                        <Radio value="momo"> Thanh toán tiền bằng momo</Radio>
                                        <Radio value="vnpay"> Thanh toán tiền bằng vnpay</Radio>
                                    </WrapperRadio>
                                </div>
                            </WrapperInfo>
                        </WrapperLeft>
                        <WrapperRight>
                            <h4>Billing</h4>
                            <div style={{ width: '100%' }}>
                                <WrapperInfo>
                                    <div>
                                        <span>Địa chỉ: </span>
                                        <span style={{ fontWeight: 'bold' }}>{`${user?.address}`} </span>
                                        <div onClick={handleChangeAddress} style={{ color: '#00b000', cursor: 'pointer' }}>Thay đổi</div>
                                    </div>
                                </WrapperInfo>
                                <WrapperInfo>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <span>Tạm tính</span>
                                        <span style={{ color: '#000', fontSize: '14px', fontWeight: 'bold' }}>{convertPrice(priceMemo)}</span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <span>Phí giao hàng</span>
                                        <span style={{ color: '#000', fontSize: '14px', fontWeight: 'bold' }}>{convertPrice(diliveryPriceMemo)}</span>
                                    </div>
                                </WrapperInfo>
                                <WrapperInfo>
                                    <span>Tổng tiền</span>
                                    <span style={{ display: 'flex', flexDirection: 'column' }}>
                                        <span style={{ color: '#72af5c', fontSize: '26px', fontWeight: 'bold' }}>{convertPrice(totalPriceMemo)}</span>
                                        <span style={{ color: '#000', fontSize: '11px' }}>(Đã bao gồm VAT nếu có)</span>
                                    </span>
                                </WrapperInfo>
                            </div>
                            <ButtonComponent
                                size={20}
                                styleButton={{ backgroundColor: '#72af5c', color: 'white', borderRadius: '6px', width: '100%', height: '50px', fontSize: '18px', fontWeight: '500' }}
                                textButton={'Xác nhận thanh toán'}
                                onClick={() => handleAddOrder()}
                            />
                        </WrapperRight>
                    </div>
                </div>
                <ModalComponent title="Cập nhật thông tin giao hàng" open={isOpenModalUpdateInfo} onCancel={handleCancleUpdate} onOk={handleUpdateInforUser}>
                    <Loading isLoading={isPending}>
                        <Form
                            name="basic"
                            labelCol={{ span: 4 }}
                            wrapperCol={{ span: 20 }}
                            autoComplete="on"
                            form={form}
                        >
                            <Form.Item
                                label="Name"
                                name="name"
                                rules={[{ required: true, message: 'Please input your name!' }]}
                            >
                                <InputComponent value={stateUserDetails['name']} onChange={handleOnchangeDetails} name="name" />
                            </Form.Item>
                            <Form.Item
                                label="Phone"
                                name="phone"
                                rules={[{ required: true, message: 'Please input your  phone!' }]}
                            >
                                <InputComponent value={stateUserDetails.phone} onChange={handleOnchangeDetails} name="phone" />
                            </Form.Item>

                            <Form.Item
                                label="Adress"
                                name="address"
                                rules={[{ required: true, message: 'Please input your  address!' }]}
                            >
                                <InputComponent value={stateUserDetails.address} onChange={handleOnchangeDetails} name="address" />
                            </Form.Item>
                        </Form>
                    </Loading>
                </ModalComponent>
            </Loading>
        </div >
    )
}

export default PaymentPage