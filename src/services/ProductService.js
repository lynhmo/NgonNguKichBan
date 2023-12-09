import axios from 'axios'

export const allProduct = async (data) => {
    const res = await axios.get(`${process.env.REACT_APP_URL}/user/sign-in`, data)
    return res.data
}