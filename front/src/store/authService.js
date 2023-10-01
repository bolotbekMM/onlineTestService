import axios from 'axios'

const API_URL = 'http://localhost:5000/'

const signup = (signUpData) => {
   console.log('222222222')
   return axios.post(`${API_URL}/auth/registration`, signUpData)
}

const login = (signUpData) => {
   return axios.post(`${API_URL}/auth/login`, signUpData)
}

const authService = { signup, login }

export default authService
