import axios from "axios"

const API_CONVERSATION_URL = "https://react-chat-api.onrender.com/api/conversations"

const config = {
    headers: {
        "Content-type": "application/json"
    }
}

export const selectConversation = async (idUser1, idUser2) => {
    const res = await axios.get(`${API_CONVERSATION_URL}/${idUser1}/${idUser2}`)
    return res.data
}

export const getUserChats = async (idUser) => {
    const res = await axios.get(`${API_CONVERSATION_URL}/${idUser}`)
    return res.data
}

export const addUserConversation = async (values) => {
    await axios.post(API_CONVERSATION_URL, values,config)
}