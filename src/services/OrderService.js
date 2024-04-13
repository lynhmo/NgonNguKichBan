import axios from "axios"
import { axiosJWT } from "./UserService"



export const createOrder = async (access_token, data) => {
    const res = await axiosJWT.post(`${process.env.REACT_APP_URL}/order/create`, data, {
        headers: {
            token: `BbbbGet ${access_token}`
        }
    })
    return res.data
}


export const GetOrderFilter = async (search, page = 0, limit = 8) => {
    let res = {}
    if (search) {
        res = await axios.get(`${process.env.REACT_APP_URL}/order/getall?page=${page}&limit=${limit}&filter=name&filter=${search}`)
    } else {
        res = await axios.get(`${process.env.REACT_APP_URL}/order/getall?page=${page}&limit=${limit}`)
    }
    return res.data
}