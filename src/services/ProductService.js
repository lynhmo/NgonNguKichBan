import axios from "axios"
import { axiosJWT } from "./UserService"

export const GetAllProduct = async () => {
    // const res = await axios.get(`${process.env.REACT_APP_URL}/product/getall?page=0&limit=0`)
    const res = await axios.get(`${process.env.REACT_APP_URL}/product/getall`)
    return res.data
}
export const GetProductPage = async (page, limit) => {
    const res = await axios.get(`${process.env.REACT_APP_URL}/product/getall?page=0&limit=0`)
    return res.data
}
export const GetProductFilter = async (search, page = 0, limit = 8) => {
    let res = {}
    // console.log('search', search)
    if (search) {
        res = await axios.get(`${process.env.REACT_APP_URL}/product/getall?page=${page}&limit=${limit}&filter=name&filter=${search}`)
    } else {
        res = await axios.get(`${process.env.REACT_APP_URL}/product/getall?page=${page}&limit=${limit}`)
    }
    return res.data
}
export const createProduct = async (data) => {
    const res = await axios.post(`${process.env.REACT_APP_URL}/product/create`, data)
    return res.data
}

export const getDetailProduct = async (id) => {
    const res = await axios.get(`${process.env.REACT_APP_URL}/product/detail/${id}`)
    return res.data
}
export const updateProduct = async (id, access_token, data) => {
    const res = await axiosJWT.put(`${process.env.REACT_APP_URL}/product/update/${id}`, data, {
        headers: {
            token: `BbbbGet ${access_token}`
        }
    })
    return res.data
}
export const deleteProduct = async (id, access_token) => {
    const res = await axiosJWT.delete(`${process.env.REACT_APP_URL}/product/delete/${id}`, {
        headers: {
            token: `BbbbGet ${access_token}`
        }
    })
    return res.data
}
export const deleteManyProduct = async (data, access_token) => {
    const res = await axiosJWT.post(`${process.env.REACT_APP_URL}/product/delete-many`, data, {
        headers: {
            token: `BbbbGet ${access_token}`
        }
    })
    return res.data
}