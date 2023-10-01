import { axiosInstance } from './axiosInstance'

export const getAllTest = () => {
   return axiosInstance.get('/api/user/tests')
}
export const getUserTest = (id) => {
   console.log(id, 'getUserTest')
   return axiosInstance.get(`/api/user/tests/${id}`)
}
export const postUserAnswerQuestion = (testId) => {
   console.log(testId, 'postUserAnswerQuestion')
   return axiosInstance.post(`/api/user/tests/${testId}`)
}
export const postUserTest = (answers) => {
   return axiosInstance.post(`/api/user/tests/question`, answers)
}
