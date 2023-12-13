import React, { useEffect, useRef, useState } from 'react'
import { WrapperHeader, WrapperUploadFile } from './style'
import { Button, Form, Space } from 'antd'
import { PlusCircleFilled, DeleteTwoTone, EditTwoTone, SearchOutlined } from '@ant-design/icons'
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
import { useSelector } from 'react-redux'
import ModalComponent from '../../components/ModalComponent/ModalComponent'




const AdminProduct = () => {
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
        price: '',
        description: '',
        image: '',
        type: '',
        countInStock: '',
        rating: ''
    })
    const [stateProduct, setStateProduct] = useState(inittial());
    const [stateProductDetail, setStateProductDetail] = useState(inittial());


    const handleAddUser = () => { setIsModalOpen(true); }
    const handleCancel = () => {
        setIsModalOpen(false);
        setStateProduct(inittial())
        form.resetFields();
    };
    const handleCancelDrawer = () => {
        setIsOpenDrawer(false);
        setStateProductDetail(inittial())
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
    useEffect(() => {
        if (isSuccessDeleteMany && dataDeleteMany?.status === 'OK') {
            AlertMessage.success()
            mutationDeleteMany.reset()
        } else if (data?.status === 'ERR') {
            AlertMessage.error()
            mutationDeleteMany.reset()
        }
    })
    const mutationUpdate = useMutationHook(
        (data) => {
            const { id, token, ...rests } = data
            const res = ProductService.updateProduct(id, token, { ...rests })
            return res
        }
    )
    const mutationDelete = useMutationHook(
        (data) => {
            const { id, token } = data
            const res = ProductService.deleteProduct(id, token)
            return res
        }
    )
    const mutationDeleteMany = useMutationHook(
        (data) => {
            const { ids, token } = data
            const res = ProductService.deleteManyProduct(ids, token)
            return res
        }
    )
    const mutation = useMutationHook(
        (data) => {
            const { name, price, description, image, type, countInStock, rating } = data
            const res = ProductService.createProduct({ name, price, description, image, type, countInStock, rating })
            return res
        }
    )

    const { data, isSuccess, isPending } = mutation
    const { data: dataUpdate, isSuccess: isSuccessUpdate, isPending: isPendingUpdate } = mutationUpdate
    const { data: dataDelete, isSuccess: isSuccessDelete, isPending: isPendingDelete } = mutationDelete
    const { data: dataDeleteMany, isSuccess: isSuccessDeleteMany, isPending: isPendingDeleteMany } = mutationDeleteMany

    const onFinishAddProduct = () => {
        console.log(stateProduct)
        mutation.mutate(stateProduct, {
            onSettled: () => {
                queryProduct.refetch()
            }
        })
    };
    const onFinishUpdateProduct = () => {
        mutationUpdate.mutate({ id: rowSelected, token: user?.access_token, ...stateProductDetail }, {
            onSettled: () => {
                queryProduct.refetch() //update table after update product
            }
        })
    }
    const onFinishFailed = () => { AlertMessage.error() };
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
        try {
            const res = await ProductService.getDetailProduct(rowSelected)
            if (res?.data) {
                setStateProductDetail({
                    name: res?.data.name,
                    price: res?.data.price,
                    image: res?.data.image,
                    type: res?.data.type,
                    countInStock: res?.data.countInStock,
                    rating: res?.data.rating,
                    description: res?.data.description
                })
            }
            setIsLoadingUpdate(false)
        } catch (error) {

        }
    }
    useEffect(() => {
        if (!isModalOpen) {
            form.setFieldsValue(stateProductDetail)
        }
    }, [form, stateProductDetail, isModalOpen]);

    useEffect(() => {
        if (rowSelected && isOpenDrawer) {
            setIsLoadingUpdate(true)
            fetchGetDetailProducts(rowSelected)
        }
    }, [rowSelected, isOpenDrawer])

    const handleDeleteProduct = () => {
        mutationDelete.mutate({ id: rowSelected, token: user?.access_token }, {
            onSettled: () => {
                queryProduct.refetch()
            }
        })
    }
    const handleDeleteManyProduct = (ids) => {
        // console.log("id", _id)
        mutationDeleteMany.mutate({ ids: ids, token: user?.access_token }, {
            onSettled: () => {
                queryProduct.refetch()
            }
        })
    }
    const handleEditProduct = () => { setIsOpenDrawer(true) }
    const fetchGetAllProducts = async () => {
        const res = await ProductService.GetProductPage()
        return res
    }
    const queryProduct = useQuery({ queryKey: ['products'], queryFn: fetchGetAllProducts })
    const { isLoading, data: productData } = queryProduct
    const renderAction = () => {
        return (
            <div style={{ fontSize: 25, display: 'flex', gap: 10 }}>
                <EditTwoTone twoToneColor={'#397224'} onClick={handleEditProduct} style={{ cursor: 'pointer' }} />
                <DeleteTwoTone twoToneColor={'#FF0000'} onClick={() => { setIsModalOpenDelete(true) }} style={{ cursor: 'pointer' }} />
            </div>
        )
    }


    // search for products

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
        }
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
            title: 'Stock',
            dataIndex: 'countInStock',
            sorter: (a, b) => a.countInStock - b.countInStock
        },
        {
            title: 'Type',
            dataIndex: 'type',
            sorter: (a, b) => a.type - b.type,
            ...getColumnSearchProps('type')
        },
        {
            title: 'Price',
            dataIndex: 'price',
            sorter: (a, b) => a.price - b.price,
            filters: [
                {
                    text: '>= 500',
                    value: '>=',
                },
                {
                    text: '<= 100',
                    value: '<=',
                }
            ],
            onFilter: (value, record) => {
                if (value === '>=') {
                    return record.price >= 500
                }
                return record.price <= 100
            },
        },
        {
            title: 'Rating',
            dataIndex: 'rating',
            sorter: (a, b) => a.rating - b.rating,
            filters: [
                {
                    text: '>= 3',
                    value: '>=',
                },
                {
                    text: '<= 3',
                    value: '<=',
                }
            ],
            onFilter: (value, record) => {
                if (value === '>=') {
                    return Number(record.rating) >= 3
                }
                return Number(record.rating) <= 3
            },
        },

        {
            title: 'Description',
            dataIndex: 'description',
            sorter: (a, b) => a.description.length - b.description.length

        },
        {
            title: 'Action',
            dataIndex: 'action',
            render: renderAction
        },
    ];
    const dataTable = productData?.data?.map((product) => {
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

                {/* MODAL ADD PROD */}
                <ModalComponent forceRender title="ADD PRODUCT" open={isModalOpen} onCancel={handleCancel} footer={null}>
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
                            onFinish={onFinishAddProduct}
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
                </ModalComponent>
                {/*  */}
                {/* MODAL DEL PROD */}
                <ModalComponent forceRender title="DELETE PRODUCT" open={isModalOpenDelete} onCancel={handleCancelDelete} onOk={handleDeleteProduct} >
                    <Loading isLoading={isPendingDelete} >
                        <div style={{ color: 'red' }}>
                            Confirm delete product!
                        </div>
                    </Loading>
                </ModalComponent>
                {/*  */}
                <hr />
                {/* Table */}
                <TableComponent
                    ColumnData={columns}
                    TableData={dataTable}
                    isLoading={isLoading || isPendingDeleteMany || isPendingDelete || isPendingUpdate}
                    handleDeleteMany={handleDeleteManyProduct}
                    onRow={(record, rowIndex) => {
                        return {
                            onClick: (event) => { setRowSelected(record._id) }, // click row
                        };
                    }}
                />
                {/* Update */}
                <DrawerComponent title='Product Detail' isOpen={isOpenDrawer} size={'large'} onClose={() => { setIsOpenDrawer(false) }} >
                    <Loading isLoading={isLoadingUpdate || isPendingUpdate} >
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
                            onFinish={onFinishUpdateProduct}
                            onFinishFailed={onFinishFailed}
                            autoComplete="on"
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

                            <Form.Item label="Image" name="image"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please upload Product Image!',
                                    },
                                ]}
                            >
                                <div style={{ display: 'flex', alignItems: 'center' }}>

                                    <WrapperUploadFile onChange={handleImageChangeDetailProduct} maxCount={1} >
                                        <Button icon={<UploadOutlined />}>Select File</Button>
                                    </WrapperUploadFile>
                                    {stateProductDetail?.image && (
                                        <img src={stateProductDetail?.image} alt='avatar' style={{
                                            height: '100px',
                                            width: '100px',
                                            borderRadius: '10px',
                                            objectFit: 'cover'
                                        }} />
                                    )}
                                </div>
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

export default AdminProduct