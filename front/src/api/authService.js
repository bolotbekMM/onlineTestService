import { axiosInstance } from './axiosInstance'

const signUpRequest = (signUpData) => {
   return axiosInstance.post(`auth/registration`, signUpData)
}

const loginRequest = (signUpData) => {
   return axiosInstance.post(`auth/login`, signUpData)
}

const authService = { signUpRequest, loginRequest }

export default authService
