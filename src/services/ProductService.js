import axios from 'axios'

export const GetAllProduct = async (data) => {
    const res = await axios.get(`${process.env.REACT_APP_URL}/product/getall`)
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
export const updateProduct = async (id, data) => {
    const res = await axios.put(`${process.env.REACT_APP_URL}/product/detail/${id}`, data)
    return res.data
}