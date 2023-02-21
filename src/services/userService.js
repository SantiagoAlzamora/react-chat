import axios from "axios"

const API_USERS_URL = "https://react-chat-api.onrender.com/api/users"

const config = {
    headers: {
        'Content-Type': 'application/json'
    }
}

export const registerUser = async (values)=>{
    await axios.post(`${API_USERS_URL}/register`,values,config)
}

export const loginUser = async (values)=>{
    const res = await axios.post(`${API_USERS_URL}/login`,values)
    return res.data
}

export const getUserByEmail = async (email)=>{
    const res = await axios.get(`${API_USERS_URL}/email/${email}`)
    return res.data
}