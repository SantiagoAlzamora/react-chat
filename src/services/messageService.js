import axios from "axios"

const API_MESSAGES_URL = `https://santi-react-chat.herokuapp.com/api/messages`
const config = {
    headers: {
        'Content-type': "application/json"
    }
}

export const saveMessage = async (message) => {
    const res = await axios.post(API_MESSAGES_URL, message, config)
    return res
}

export const getConversationMessages = async (idChat) => {
    const res = await axios.get(`${API_MESSAGES_URL}/${idChat}`)
    return res.data
}