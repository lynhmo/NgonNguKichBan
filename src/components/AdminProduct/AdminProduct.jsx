import React, { useEffect, useState } from 'react'
import { WrapperHeader, WrapperUploadFile } from './style'
import { Button, Modal, Form } from 'antd'
import { PlusCircleFilled, DeleteTwoTone, EditTwoTone } from '@ant-design/icons'
import * as AlertMessage from '../Message/Message'
import TableComponent from '../TableComponent/TableComponent'
import InputComponent from '../InputComponent/InputComponent'
import { getBase64 } from '../../utils'
import { UploadOutlined } from '@ant-design/icons'
import { useMutationHook } from '../../hooks/useMutationHook'
import * as ProductService from '../../services/ProductService'
import Loading from '../../components/Loading/Loading'
import { useQuery } from '@tanstack/react-query'
import DrawerComponent from '../../components/DrawerComponent/DrawerComponent'

const AdminProduct = () => {
    const [form] = Form.useForm()
    const [rowSelected, setRowSelected] = useState('')
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isOpenDrawer, setIsOpenDrawer] = useState(false)

    const [stateProduct, setStateProduct] = useState({
        name: '',
        price: '',
        description: '',
        image: '',
        type: '',
        countInStock: '',
        rating: ''
    });
    const [stateProductDetail, setStateProductDetail] = useState({
        name: '',
        price: '',
        description: '',
        image: '',
        type: '',
        countInStock: '',
        rating: ''
    });
    const mutation = useMutationHook(
        (data) => {
            const { name, price, description, image, type, countInStock, rating } = data
            const res = ProductService.createProduct({ name, price, description, image, type, countInStock, rating })
            return res
        }
    )
    const { data, isError, isSuccess, isPending } = mutation

    const handleAddUser = () => {
        setIsModalOpen(true);
    }
    const handleOk = () => { };     // dummy function
    const handleCancel = () => {
        setIsModalOpen(false);
        setStateProduct({
            name: '',
            price: '',
            description: '',
            image: '',
            type: '',
            countInStock: '',
            rating: ''
        })
        form.resetFields();
    };
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



    const onFinish = (values) => { mutation.mutate(stateProduct) };
    const onFinishFailed = (errorInfo) => { AlertMessage.error() };
    const handleOnChange = (e) => {
        setStateProduct({
            ...stateProduct,
            [e.target.name]: e.target.value
        })
    }
    const handleOnChangeDetailProduct = (e) => {
        setStateProductDetail({
            ...stateProductDetail,
            [e.target.name]: e.target.value
        })
    }

    const handleImageChange = async ({ fileList }) => {
        try {
            const file = fileList[0]
            if (!file.url && !file.preview) {
                file.preview = await getBase64(file.originFileObj);
            }
            setStateProduct({
                ...stateProduct,
                image: file.preview
            })
        } catch (error) {
            AlertMessage.error('Something wrong')
        }
    }
    const handleImageChangeDetailProduct = async ({ fileList }) => {
        try {
            const file = fileList[0]
            if (!file.url && !file.preview) {
                file.preview = await getBase64(file.originFileObj);
            }
            setStateProductDetail({
                ...stateProductDetail,
                image: file.preview
            })
        } catch (error) {
            AlertMessage.error('Something wrong')
        }
    }

    const fetchGetDetailProducts = async (rowSelected) => {
        const res = await ProductService.getDetailProduct(rowSelected)
        if (res?.data) {
            setStateProductDetail({
                name: res?.data.name,
                price: res?.data.price, 
                image: res?.data.image,
                type: res?.data.type,
                countInStock: res?.data.countInStock,
                rating: res?.data.rating
            })
        }
        // return res
    }
    useEffect(() => {
        if (rowSelected) {
            fetchGetDetailProducts(rowSelected)
        }
    }, [rowSelected])
    const handleEditProduct = () => {
        console.log('stateProductDetail', stateProductDetail)
        if (rowSelected) {
            fetchGetDetailProducts()
        }
        setIsOpenDrawer(true)
    }

    const fetchGetAllProducts = async () => {
        const res = await ProductService.GetAllProduct()
        return res
    }
    const { isLoading, data: productData } = useQuery({ queryKey: 'products', queryFn: fetchGetAllProducts })
    const renderAction = () => {
        return (
            <div style={{ fontSize: 25, cursor: 'pointer' }}>
                <EditTwoTone twoToneColor={'#397224'} onClick={handleEditProduct} />
                <DeleteTwoTone twoToneColor={'#FF0000'} />
            </div>
        )
    }
    // Data for Table
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'Stock',
            dataIndex: 'countInStock',
        },
        {
            title: 'Type',
            dataIndex: 'type',
        },
        {
            title: 'Price',
            dataIndex: 'price',
        },
        {
            title: 'Rating',
            dataIndex: 'rating',
        },

        {
            title: 'Description',
            dataIndex: 'rating',
        },
        {
            title: 'Image',
            dataIndex: 'image',
        },
        {
            title: 'Action',
            dataIndex: 'action',
            render: renderAction
        },
    ];
    const dataTable = productData?.data.map((product) => {
        return { ...product, key: product._id };
    })


    return (
        <div>
            <WrapperHeader>Product Manager</WrapperHeader>

            <div style={{ padding: 20 }}>
                <Button onClick={handleAddUser}>
                    Add Product
                    <PlusCircleFilled />
                </Button>
                <Modal title="Add user" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null}>
                    <Loading isLoading={isPending} >
                        <Form
                            name="basic"
                            labelCol={{
                                span: 6,
                            }}
                            wrapperCol={{
                                span: 18,
                            }}
                            style={{
                                maxWidth: 600,
                            }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            autoComplete="off"
                            form={form}
                        >
                            <Form.Item
                                label="Name"
                                name="name"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input Product Name!',
                                    },
                                ]}
                            >
                                <InputComponent placeholder={'product name'} onChange={handleOnChange} value={stateProduct.name} name='name' />
                            </Form.Item>

                            <Form.Item
                                label="Type"
                                name="type"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input Product Type!',
                                    },
                                ]}
                            >
                                <InputComponent placeholder={'Product Type'} onChange={handleOnChange} value={stateProduct.type} name='type' />
                            </Form.Item>

                            <Form.Item
                                label="Count in stock"
                                name="countInStock"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input Product Stock!',
                                    },
                                ]}
                            >
                                <InputComponent placeholder={'Product Stock'} onChange={handleOnChange} value={stateProduct.countInStock} name='countInStock' />
                            </Form.Item>

                            <Form.Item
                                label="Price"
                                name="price"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input Product Price!',
                                    },
                                ]}
                            >
                                <InputComponent placeholder={'Product Price'} onChange={handleOnChange} value={stateProduct.price} name='price' />
                            </Form.Item>

                            <Form.Item
                                label="Rating"
                                name="rating"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input Product Rating!',
                                    },
                                ]}
                            >
                                <InputComponent placeholder={'Product Rating'} onChange={handleOnChange} value={stateProduct.rating} name='rating' />
                            </Form.Item>

                            <Form.Item
                                label="Description"
                                name="description"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input Product Description!',
                                    },
                                ]}
                            >
                                <InputComponent placeholder={'Product Description'} onChange={handleOnChange} value={stateProduct.description} name='description' />
                            </Form.Item>

                            <Form.Item
                                label="Image"
                                name="image"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please upload Product Image!',
                                    },
                                ]}
                            >
                                <WrapperUploadFile onChange={handleImageChange} maxCount={1} >
                                    <Button icon={<UploadOutlined />}>Select File</Button>
                                    {stateProduct?.image && (
                                        <img src={stateProduct?.image} alt='avatar' style={{
                                            height: '100px',
                                            width: '100px',
                                            borderRadius: '10px',
                                            objectFit: 'cover'
                                        }} />
                                    )}
                                </WrapperUploadFile>
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
                    </Loading>
                </Modal>

                <hr />
                <div>
                    <TableComponent
                        ColumnData={columns}
                        TableData={dataTable}
                        isLoading={isLoading}
                        onRow={(record, rowIndex) => {
                            return {
                                onClick: (event) => { setRowSelected(record._id) }, // click row
                            };
                        }}
                    />
                </div>

                <DrawerComponent
                    title='Product Detail'
                    isOpen={isOpenDrawer}
                    onClose={() => { setIsOpenDrawer(false) }}
                >
                    <Loading isLoading={isPending} >
                        <Form
                            name="basic"
                            labelCol={{
                                span: 6,
                            }}
                            wrapperCol={{
                                span: 18,
                            }}
                            style={{
                                maxWidth: 600,
                            }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            autoComplete="off"
                        // form={form}
                        >
                            <Form.Item
                                label="Name"
                                name="name"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input Product Name!',
                                    },
                                ]}
                            >
                                <InputComponent placeholder={'product name'} onChange={handleOnChangeDetailProduct} value={stateProductDetail.name} name='name' />
                            </Form.Item>

                            <Form.Item
                                label="Type"
                                name="type"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input Product Type!',
                                    },
                                ]}
                            >
                                <InputComponent placeholder={'Product Type'} onChange={handleOnChangeDetailProduct} value={stateProductDetail.type} name='type' />
                            </Form.Item>

                            <Form.Item
                                label="Count in stock"
                                name="countInStock"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input Product Stock!',
                                    },
                                ]}
                            >
                                <InputComponent placeholder={'Product Stock'} onChange={handleOnChangeDetailProduct} value={stateProductDetail.countInStock} name='countInStock' />
                            </Form.Item>

                            <Form.Item
                                label="Price"
                                name="price"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input Product Price!',
                                    },
                                ]}
                            >
                                <InputComponent placeholder={'Product Price'} onChange={handleOnChangeDetailProduct} value={stateProductDetail.price} name='price' />
                            </Form.Item>

                            <Form.Item
                                label="Rating"
                                name="rating"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input Product Rating!',
                                    },
                                ]}
                            >
                                <InputComponent placeholder={'Product Rating'} onChange={handleOnChangeDetailProduct} value={stateProductDetail.rating} name='rating' />
                            </Form.Item>

                            <Form.Item
                                label="Description"
                                name="description"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input Product Description!',
                                    },
                                ]}
                            >
                                <InputComponent placeholder={'Product Description'} onChange={handleOnChangeDetailProduct} value={stateProductDetail.description} name='description' />
                            </Form.Item>

                            <Form.Item
                                label="Image"
                                name="image"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please upload Product Image!',
                                    },
                                ]}
                            >
                                <WrapperUploadFile onChange={handleImageChangeDetailProduct} maxCount={1} >
                                    <Button icon={<UploadOutlined />}>Select File</Button>
                                    {stateProductDetail?.image && (
                                        <img src={stateProductDetail?.image} alt='avatar' style={{
                                            height: '100px',
                                            width: '100px',
                                            borderRadius: '10px',
                                            objectFit: 'cover'
                                        }} />
                                    )}
                                </WrapperUploadFile>
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
                    </Loading>
                </DrawerComponent>
            </div>
        </div>
    )
}

export default AdminProduct