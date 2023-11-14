import { Col } from 'antd'
import React from 'react'
import { WrapperFooter, WrapperFooterChildTitle } from './style'

const FooterComponent = () => {
    return (
        <div>
            <WrapperFooter>
                <Col span={7}>
                    <div >
                        BOTSTORE
                    </div>
                    <div>
                        LOGO
                    </div>
                </Col>
                <Col span={5}>
                    <WrapperFooterChildTitle>
                        Về Chúng Tôi
                    </WrapperFooterChildTitle>
                    <div>Careers</div>
                    <div>Cửa hàng của chúng tôi</div>
                    <div>Chính sách giao hàng</div>
                    <div>Điều khoản dịch vụ</div>
                    <div>Chính sách quyền riêng tư</div>
                </Col>
                <Col span={5}>
                    <WrapperFooterChildTitle>
                        Hỗ trợ khách hàng
                    </WrapperFooterChildTitle>
                    <div>Trung tâm hỗ trợ</div>
                    <div>Cách để mua hàng</div>
                    <div>Tra cứu đơn hàng</div>
                    <div>Hợp tác</div>
                    <div>Hoàn tiền và hoàn trả</div>
                </Col>
                <Col span={7}>
                    <WrapperFooterChildTitle>
                        Liên hệ chúng tôi
                    </WrapperFooterChildTitle>
                    <div>69 Thái Hà, Trung Liệt, Đống Đa, Hà Nội</div>
                    <div>Email: botstore.vn@gmail.com</div>
                    <div>Số điện thoại: +84 987-654-321</div>
                </Col>
            </WrapperFooter>

        </div>
    )
}

export default FooterComponent