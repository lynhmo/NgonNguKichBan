import axios from "axios"
import { axiosJWT } from "./UserService"

// export const createProduct = async (data) => {
//     const res = await axios.post(`${process.env.REACT_APP_URL}/product/create`, data)
//     return res.data
// }

export const createOrder = async (access_token, data) => {
    const res = await axiosJWT.post(`${process.env.REACT_APP_URL}/order/create`, data, {
        headers: {
            token: `BbbbGet ${access_token}`
        }
    })
    return res.data
}