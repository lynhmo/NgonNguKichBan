import React, { useEffect, useRef, useState } from 'react'
import { WrapperHeader, WrapperUploadFile } from './style'
import { Button, Space, Checkbox, Form } from 'antd'
import { PlusCircleFilled, DeleteTwoTone, EditTwoTone, SearchOutlined, UploadOutlined } from '@ant-design/icons'
import * as AlertMessage from '../Message/Message'
import TableComponent from '../TableComponent/TableComponent'
import InputComponent from '../InputComponent/InputComponent'
import ModalComponent from '../../components/ModalComponent/ModalComponent'
import Loading from '../Loading/Loading'
import { useQuery } from '@tanstack/react-query'
import * as UserService from '../../services/UserService'
import { useSelector } from 'react-redux'
import { useMutationHook } from '../../hooks/useMutationHook'
import DrawerComponent from '../DrawerComponent/DrawerComponent'
import { getBase64 } from '../../utils'


const AdminUser = () => {
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const user = useSelector((state) => state.user)
    const [form] = Form.useForm()
    const [rowSelected, setRowSelected] = useState('')
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
    const [isOpenDrawer, setIsOpenDrawer] = useState(false)
    const [isLoadingUpdate, setIsLoadingUpdate] = useState(false)
    const inittial = () => ({
        name: '',
        email: '',
        phone: '',
        isAdmin: false,
        address: '',
    })

    const [stateUser, setStateUser] = useState(inittial());
    const [stateUserDetail, setStateUserDetail] = useState(inittial());

    const mutation = useMutationHook(
        (data) => {
            const { name, email, isAdmin, phone, address, avtar } = data
            const res = UserService.signupUser({ name, email, isAdmin, phone, address, avtar })
            return res
        }
    )
    const { data, isSuccess } = mutation

    const handleAddUser = () => { setIsModalOpen(true); }     // dummy function
    const handleCancel = () => {
        setIsModalOpen(false);
        setStateUser(inittial())
        form.resetFields();
    };
    const handleCancelDrawer = () => {
        setIsOpenDrawer(false);
        setStateUserDetail(inittial())
        form.resetFields();
    };
    const handleCancelDelete = () => { setIsModalOpenDelete(false) }
    useEffect(() => {
        if (isSuccess && data?.status === 'OK') {
            AlertMessage.success()
            handleCancel()
            mutation.reset();
        } else if (data?.status === 'ERR') {
            AlertMessage.error()
            mutation.reset();
        }
    })
    useEffect(() => {
        if (isSuccessUpdate && dataUpdate?.status === 'OK') {
            AlertMessage.success()
            handleCancelDrawer()
            mutationUpdate.reset()
        } else if (data?.status === 'ERR') {
            AlertMessage.error()
            mutationUpdate.reset()
        }
    })
    useEffect(() => {
        if (isSuccessDelete && dataDelete?.status === 'OK') {
            AlertMessage.success()
            handleCancelDelete()
            mutationDelete.reset()
        } else if (data?.status === 'ERR') {
            AlertMessage.error()
            mutationDelete.reset()
        }
    })
    const mutationUpdate = useMutationHook(
        (data) => {
            const { id, token, ...rests } = data
            const res = UserService.updateUser(id, token, { ...rests })
            return res
        }
    )
    const mutationDelete = useMutationHook(
        (data) => {
            const { id, token } = data
            const res = UserService.deleteUser(id, token)
            return res
        }
    )
    const { data: dataUpdate, isSuccess: isSuccessUpdate, isPending: isPendingUpdate } = mutationUpdate
    const { data: dataDelete, isSuccess: isSuccessDelete, isPending: isPendingDelete } = mutationDelete
    const onFinishAddUser = (values) => {
        mutation.mutate(stateUser, {
            onSettled: () => {
                queryUser.refetch()
            }
        })
    };
    const onFinishUpdateUser = (values) => {
        mutationUpdate.mutate({ id: rowSelected, token: user?.access_token, ...stateUserDetail }, {
            onSettled: () => {
                queryUser.refetch() //update table after update product
            }
        })
    }
    const onFinishFailed = (errorInfo) => { AlertMessage.error() };

    const handleOnChange = (e) => { //belong to add user not use
        setStateUser({
            ...stateUser,
            [e.target.name]: e.target.value
        })
    }

    const handleOnChangeDetailUser = (e) => {
        setStateUserDetail({
            ...stateUserDetail,
            [e.target.name]: e.target.value
        })
    }

    const handleAvatarUser = async ({ fileList }) => {
        try {
            const file = fileList[0]
            if (!file.url && !file.preview) {
                file.preview = await getBase64(file.originFileObj);
            }
            stateUserDetail({
                ...stateUserDetail,
                image: file.preview
            })
        } catch (error) {
            AlertMessage.error('Something wrong')
        }
    }

    const fetchGetDetailUsers = async (rowSelected) => {
        try {
            const res = await UserService.getDetailUser(rowSelected)
            if (res?.data) {
                setStateUserDetail({
                    name: res?.data.name,
                    email: res?.data.email,
                    phone: res?.data.phone,
                    isAdmin: res?.data.isAdmin,
                    address: res?.data.address,
                })
            }
            setIsLoadingUpdate(false)
        } catch (error) {

        }
    }
    useEffect(() => {
        if (!isModalOpen) {
            form.setFieldsValue(stateUserDetail)
        }
    }, [form, stateUserDetail, isModalOpen]);

    useEffect(() => {
        if (rowSelected) {
            setIsLoadingUpdate(true)
            fetchGetDetailUsers(rowSelected)
        }
    }, [rowSelected])

    const handleDeleteUser = () => {
        mutationDelete.mutate({ id: rowSelected, token: user?.access_token }, {
            onSettled: () => {
                queryUser.refetch()
            }
        })
    }
    const handleEditUser = () => { setIsOpenDrawer(true) }
    const fetchGetAllUser = async () => {
        const res = await UserService.getallUser()
        return res
    }
    const queryUser = useQuery({ queryKey: ['user'], queryFn: fetchGetAllUser })
    const { isLoading: isLoadingUsers, data: usersData } = queryUser
    const renderAction = () => {
        return (
            <div style={{ fontSize: 25, display: 'flex', gap: 10 }}>
                <EditTwoTone twoToneColor={'#397224'} onClick={handleEditUser} style={{ cursor: 'pointer' }} />
                <DeleteTwoTone twoToneColor={'#FF0000'} onClick={() => { setIsModalOpenDelete(true) }} style={{ cursor: 'pointer' }} />
            </div>
        )
    }


    // search

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };
    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };
    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div
                style={{
                    padding: 8,
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <InputComponent
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({
                                closeDropdown: false,
                            });
                            setSearchText(selectedKeys[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Filter
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? '#1677ff' : undefined,
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        // render: (text) =>
        //     searchedColumn === dataIndex ? (
        //         <Highlighter
        //             highlightStyle={{
        //                 backgroundColor: '#ffc069',
        //                 padding: 0,
        //             }}
        //             searchWords={[searchText]}
        //             autoEscape
        //             textToHighlight={text ? text.toString() : ''}
        //         />
        //     ) : (
        //         text
        //     ),
    });


    // Data for Table
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            sorter: (a, b) => a.name.length - b.name.length,
            ...getColumnSearchProps('name')
        },
        {
            title: 'Email',
            dataIndex: 'email',
            sorter: (a, b) => a.email.length - b.email.length,
            ...getColumnSearchProps('email')

        },
        {
            title: 'Admin',
            dataIndex: 'isAdmin',
            filters: [
                {
                    text: 'Admin',
                    value: true,
                },
                {
                    text: 'User',
                    value: false,
                }
            ],
            onFilter: (value, record) => {
                if (value === true) {
                    return record.isAdmin === true
                }
                return record.isAdmin === false
            },
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            ...getColumnSearchProps('phone')
        },
        {
            title: 'Address',
            dataIndex: 'address'
        },
        {
            title: 'Action',
            dataIndex: 'action',
            render: renderAction
        },
    ];
    const dataTable = usersData?.data?.map((userTable) => {
        return { ...userTable, key: userTable._id, isAdmin: userTable.isAdmin ? 'TRUE' : 'FALSE' };
    })



























    return (
        <div>
            <WrapperHeader>User Manager</WrapperHeader>

            <div style={{ padding: 20 }}>
                <Button onClick={handleAddUser} disabled>
                    Add User
                    <PlusCircleFilled />
                </Button>
                {/* <ModalComponent forceRender title="Add user" open={isModalOpen} onCancel={handleCancel} footer={null}>
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
                        // onFinish={onFinish}
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
                </ModalComponent> */}



                <ModalComponent forceRender title="DELETE USER" open={isModalOpenDelete} onCancel={handleCancelDelete} onOk={handleDeleteUser} >
                    <Loading isLoading={isPendingDelete} >
                        <div style={{ color: 'red' }}>
                            Confirm delete user!
                        </div>
                    </Loading>
                </ModalComponent>
                <hr />

                {/* Table */}

                <Loading isLoading={isPendingUpdate}>
                    <TableComponent ColumnData={columns} TableData={dataTable} isLoading={isLoadingUsers}
                        onRow={(record, rowIndex) => {
                            return {
                                onClick: (event) => { setRowSelected(record._id) }, // click row
                            };
                        }}
                    />
                </Loading>

                <DrawerComponent title='User Detail' isOpen={isOpenDrawer} size={'large'} onClose={() => { setIsOpenDrawer(false) }} >
                    <Loading isLoading={isLoadingUpdate || isPendingUpdate} >
                        <Form
                            name="basic"
                            labelCol={{ span: 6 }}
                            wrapperCol={{ span: 18 }}
                            style={{ maxWidth: 600 }}
                            onFinish={onFinishUpdateUser}
                            onFinishFailed={onFinishFailed}
                            autoComplete="on"
                            form={form}
                        >
                            <Form.Item label="Name" name="name"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please User Name!',
                                    },
                                ]}
                            >
                                <InputComponent placeholder={'Name'} onChange={handleOnChangeDetailUser} value={stateUserDetail.name} name='name' />
                            </Form.Item>

                            <Form.Item label="Email Address" name="email"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input Email Address!',
                                    },
                                ]}
                            >
                                <InputComponent placeholder={'example@gmail.com'} onChange={handleOnChangeDetailUser} value={stateUserDetail.email} name='email' />
                            </Form.Item>

                            <Form.Item label="Admin" name="isAdmin"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input Admin!',
                                    },
                                ]}
                            >
                                <InputComponent placeholder={'true'} onChange={handleOnChangeDetailUser} value={stateUserDetail.isAdmin} name='isAdmin' />
                            </Form.Item>

                            <Form.Item label="Phone" name="phone"
                                rules={[
                                    {
                                        required: false,
                                        message: 'Please input Phone!',
                                    },
                                ]}
                            >
                                <InputComponent placeholder={'+84 xxx-xxx-xxx'} onChange={handleOnChangeDetailUser} value={stateUserDetail.phone} name='phone' />
                            </Form.Item>

                            <Form.Item label="Address" name="address"
                                rules={[
                                    {
                                        required: false,
                                        message: 'Please input address!',
                                    },
                                ]}
                            >
                                <InputComponent placeholder={'Hanoi'} onChange={handleOnChangeDetailUser} value={stateUserDetail.address} name='address' />
                            </Form.Item>

                            <Form.Item label="Avatar" name="Avatar"
                                rules={[
                                    {
                                        required: false,
                                        message: 'Please upload Avatar Image!',
                                    },
                                ]}
                            >
                                <WrapperUploadFile onChange={handleAvatarUser} maxCount={1} >
                                    <Button icon={<UploadOutlined />}>Select File</Button>
                                    {stateUserDetail?.image && (
                                        <img src={stateUserDetail?.image} alt='avatar' style={{
                                            height: '100px',
                                            width: '100px',
                                            borderRadius: '10px',
                                            objectFit: 'cover'
                                        }} />
                                    )}
                                </WrapperUploadFile>
                            </Form.Item>

                            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                                <Button type="primary" htmlType="submit">
                                    Apply
                                </Button>
                            </Form.Item>

                        </Form>
                    </Loading>
                </DrawerComponent>
            </div>
        </div>
    )
}

export default AdminUser