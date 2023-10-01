import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { BILINGUAL_TOKEN, BILINGUAL_USER } from '../utils/constants/general'
import {
   saveToLocalStorage,
   deleteFromLocalStorage,
} from '../utils/helpers/localstorege/localStorege'
import authService from '../api/authService'

export const signup = createAsyncThunk(
   'auth/signup',
   async (signUpData, thunkAPI) => {
      try {
         const response = await authService.signUpRequest(signUpData)
         return response.data
      } catch (error) {
         return thunkAPI.rejectWithValue(error.message)
      }
   }
)

export const login = createAsyncThunk(
   'auth/login',
   async (signUpData, thunkAPI) => {
      try {
         const { data } = await authService.loginRequest(signUpData)
         console.log('33333')
         const payloadData = {
            user: {
               fullName: data.fullName,
               gmail: data.gmail,
               role: data.roles[0],
               id: data.id,
            },
            token: data.token,
         }
         saveToLocalStorage(BILINGUAL_TOKEN, data.token)
         saveToLocalStorage(BILINGUAL_USER, payloadData.user)
         return payloadData
      } catch (error) {
         return thunkAPI.rejectWithValue(error.message)
      }
   }
)

export const logout = createAsyncThunk('auth/logout', async () => {
   deleteFromLocalStorage(BILINGUAL_TOKEN)
})

const initialState = {
   isAuthorized: false,
   user: {
      fullName: '',
      gmail: '',
      role: '',
   },
   id: '',
   token: '',
}

const authSlice = createSlice({
   name: 'auth',
   initialState,
   reducers: {
      autoLogin(state, action) {
         state.isAuthorized = true
         state.user = action.payload.user
         state.token = action.payload.token
      },
   },
   extraReducers: {
      [signup.fulfilled]: (state) => {
         state.isAuthorized = false
      },
      [signup.rejected]: (state) => {
         state.isAuthorized = false
      },
      [login.fulfilled]: (state, action) => {
         state.isAuthorized = true
         state.user = action.payload.user
         state.token = action.payload.token
         state.id = action.payload.id
      },
      [login.rejected]: (state) => {
         state.isAuthorized = false
         state.user = null
         state.token = ''
      },
      [logout.fulfilled]: (state) => {
         state.isLoggedIn = false
         state.user = null
         state.token = null
         state.isAuthorized = false
      },
   },
})

export default authSlice
