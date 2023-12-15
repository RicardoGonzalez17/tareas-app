import axios from "axios";

//const API_URL ='http://localhost:3003/api/users/'
const API_URL = 'https://teal-tough-fossa.cyclic.app/api/users/'

// Registrar un usuario
const register = async (userData) => {
    const response = await axios.post(API_URL,userData)
    return response.data
}

// Login
const login = async (userData) => {
    const response = await axios.post(`${API_URL}login`,userData)
    if(response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }
    return response.data
}

// Logout
const logout = async () => {
    localStorage.removeItem('user')
}

const authService = {
    register,
    login,
    logout
}

export default authService