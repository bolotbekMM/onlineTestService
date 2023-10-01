import axios from 'axios'
import { BILINGUAL_TOKEN } from '../utils/constants/general'
import { getFromLocalStorage } from '../utils/helpers/localstorege/localStorege'

const token = getFromLocalStorage(BILINGUAL_TOKEN)
const headers = {
   Authorization: `Bearer ${token}`,
}

export const axiosInstance = axios.create({
   baseURL: 'http://localhost:5000/',
})

axiosInstance.interceptors.request.use(
   async (config) => {
      // eslint-disable-next-line no-param-reassign
      config.headers = headers
      return config
   },
   (error) => {
      Promise.reject(error)
   }
)
