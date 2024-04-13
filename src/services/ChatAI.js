import axios from 'axios'

export const ChatPromt = async (body,header) => {
    const res = await axios.post(`${process.env.REACT_APP_URL}/user/gemini`, body,{
        headers: header
    })
    return res.data
}