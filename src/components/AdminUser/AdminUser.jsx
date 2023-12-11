import React, { useState } from 'react'
import { WrapperHeader } from './style'
import { Button, Modal, Checkbox, Form } from 'antd'
import { PlusCircleFilled } from '@ant-design/icons'
import * as AlertMessage from '../Message/Message'
import TableComponent from '../TableComponent/TableComponent'
import InputComponent from '../InputComponent/InputComponent'

const AdminUser = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleAddUser = () => {
        setIsModalOpen(true);
    }
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const onFinish = (values) => {
        AlertMessage.success()
    };
    const onFinishFailed = (errorInfo) => {
        AlertMessage.error()
    };


    return (
        <div>
            <WrapperHeader>User Manager</WrapperHeader>

            <div style={{ padding: 20 }}>
                <Button onClick={handleAddUser}>
                    Add User
                    <PlusCircleFilled />
                </Button>
          
                <Modal title="Add user" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                    <Form
                        name="basic"
                        labelCol={{
                            span: 8,
                        }}
                        wrapperCol={{
                            span: 16,
                        }}
                        style={{
                            maxWidth: 600,
                        }}
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="Name"
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your username!',
                                },
                            ]}
                        >
                            <InputComponent />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                            ]}
                        >
                            <InputComponent />
                        </Form.Item>

                        <Form.Item
                            name="remember"
                            valuePropName="checked"
                            wrapperCol={{
                                offset: 8,
                                span: 16,
                            }}
                        >
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>

                        <Form.Item
                            wrapperCol={{
                                offset: 8,
                                span: 16,
                            }}
                        >
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>
                <hr />
                <div>
                    <TableComponent />
                </div>
            </div>
        </div>
    )
}

export default AdminUser