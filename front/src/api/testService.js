import { axiosInstance } from './axiosInstance'

export const getAllTestRequest = () => {
   return axiosInstance.get(`/admin/tests`)
}
export const sendNewTestRequest = (newTest) => {
   return axiosInstance.post(`/admin/tests`, newTest)
}
export const putTestActivationRequest = (isActiveById) => {
   const { id, isActive: active } = isActiveById
   return axiosInstance.put(`/admin/tests/block/${id}`, { active })
}
export const deleteTestRequest = (id) => {
   return axiosInstance.delete(`/admin/tests/${id}`)
}
export const getTestByIdRequest = (id) => {
   return axiosInstance.get(`/admin/tests/${id}`)
}
export const putTestRequest = (id, editedTest) => {
   return axiosInstance.put(`/admin/tests/${id}`, editedTest)
}
//---------------
export const addQuestionRequest = (data) => {
   console.log(data, 'dataaaaa')
   return axiosInstance.post(`/api/admin/question`, data)
}
export const getQuestionByIdRequest = (id) => {
   return axiosInstance.get(`/api/admin/question/${id}`)
}

export const deleteQuestionByIdRequest = (id) => {
   return axiosInstance.delete(`/api/admin/question/${id}`)
}
export const putQuestionActivationRequest = (isActivatedById) => {
   const { id, isActive } = isActivatedById
   return axiosInstance.put(`/api/admin/question/block/${id}`, {
      active: isActive,
   })
}
export const putQuestionRequest = (id, data) => {
   return axiosInstance.put(`/api/admin/question/${id}`, data)
}

/* ------------ */
export const postFileRequest = (data) => {
   console.log(data)
   return axiosInstance.post(`/api/files/upload`, data)
}

export const getFileRequest = (fileName) => {
   return axiosInstance.get(`api/files/upload/${fileName}`)
}

/* ------ */

export const getAllUsersRequest = () => {
   return axiosInstance.get(`api/admin/answer`)
}
export const deleteUserRequest = (id) => {
   return axiosInstance.delete(`/api/admin/${id}`)
}

export const getUserTestAnswerRequest = (testId) => {
   return axiosInstance.get(`api/admin/answer/${testId}`)
}
export const getUserTestAnswerQuestionRequest = (questionId) => {
   return axiosInstance.get(`api/admin/answer/question/${questionId}`)
}

export const postUserQuestionScoreRequest = (questionId, score) => {
   return axiosInstance.post(`api/admin/answer/question/${questionId}`, score)
}
