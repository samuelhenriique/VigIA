import axios from 'axios'

const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api',
})

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')
    const tokenType = localStorage.getItem('token_type') || 'Bearer'

    if (token) {
        config.headers['Authorization'] = `${tokenType} ${token}`
    }

    return config
})

export default api