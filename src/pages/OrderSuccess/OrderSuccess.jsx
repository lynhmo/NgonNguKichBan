// import { Form } from 'antd'
import React, { useEffect } from 'react'
import { Lable, WrapperInfo, WrapperItemOrder, WrapperLeft } from './style';
import { useSelector } from 'react-redux';
import { useMutationHook } from '../../hooks/useMutationHook';
import * as  OrderService from '../../services/OrderService'
import Loading from '../../components/Loading/Loading';
import * as message from '../../components/Message/Message'
import { useNavigate, useLocation } from 'react-router-dom';
import { convertPrice } from '../../utils';

const OrderSuccess = () => {
    const order = useSelector((state) => state.order)
    const navigate = useNavigate()
    const location = useLocation()
    const { state } = location
    const mutationAddOrder = useMutationHook(
        (data) => {
            const { token, ...rests } = data
            const res = OrderService.createOrder(token, { ...rests })
            return res
        }
    )
    const { isPending: isPendingAddOrder, data: dataAddOrder, isSuccess: addOrderSuccess, isError: addOrderError } = mutationAddOrder

    useEffect(() => {
        if (addOrderSuccess && dataAddOrder?.status === 'OK') {
            message.success('Thanh toán thành công')
        } else if (addOrderError) {
            message.error('Thanh toán thất bại')

        }
    }, [addOrderSuccess, addOrderError, dataAddOrder])

    return (
        <div style={{ background: '#dbe4d8', with: '100%', minHeight: '100vh', paddingBottom: 30 }}>
            <Loading isLoading={isPendingAddOrder}>
                <div style={{ width: '1270px', margin: '0 auto', display: 'flex', justifyContent: 'center', minHeight: '100vh' }}>
                    <WrapperLeft>
                        <h1>Thanh toán thành công</h1>
                        <WrapperInfo>
                            <div>
                                <Lable>Phương thức giao hàng đã chọn: </Lable>
                                <span>{state?.payment}</span>
                            </div>
                        </WrapperInfo>
                        <WrapperInfo>
                            <div>
                                <Lable>Phương thức thanh toán sử dụng: </Lable>
                                <span>{state?.delivery}</span>
                            </div>
                        </WrapperInfo>
                        <WrapperInfo>
                            <div>
                                <Lable>Sản phẩm đã đặt: </Lable>
                                {state?.orders?.map((order) => {
                                    return (
                                        <WrapperItemOrder key={order?.product}>
                                            <div style={{ width: '390px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                                <img src={order?.image} style={{ width: '77px', height: '77px', objectFit: 'cover', borderRadius: '10px' }} alt='oke' />
                                                <div style={{
                                                    width: 260,
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap'
                                                }}>{order?.name}</div>
                                            </div>
                                            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                                <span style={{ fontSize: '14px', color: '#242424' }}>SL: {order?.amount}</span>
                                                <span style={{ fontSize: '14px', color: '#242424' }}>Đơn giá: {convertPrice(order?.price)}</span>
                                                <span style={{ color: '#007700', fontSize: '16px', fontWeight: 500 }}>{convertPrice(order?.price * order?.amount)}</span>
                                            </div>
                                        </WrapperItemOrder>
                                    )
                                })}
                            </div>
                        </WrapperInfo>
                    </WrapperLeft>
                </div>
            </Loading>
        </div >
    )
}

export default OrderSuccess