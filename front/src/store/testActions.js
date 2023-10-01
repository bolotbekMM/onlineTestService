import { createAsyncThunk } from '@reduxjs/toolkit'
import {
   getUserTest,
   postUserAnswerQuestion,
   postUserTest,
} from '../api/clientService'

export const getTest = createAsyncThunk(
   'get/test',
   async (testId, thunkAPI) => {
      try {
         const response = await getUserTest(testId)
         const { duration, questions, id, active } = response.data

         return { questions, id, active, duration }
      } catch (error) {
         return thunkAPI.rejectWithValue(error.message)
      }
   }
)

export const submitQuestion = createAsyncThunk(
   'post/testId',
   async (testId, thunkAPI) => {
      try {
         const response = await postUserAnswerQuestion(testId)
         return response.data
      } catch (error) {
         return thunkAPI.rejectWithValue(error.message)
      }
   }
)

export const submitQuestion1 = createAsyncThunk(
   'post/question',
   async (testId, thunkAPI) => {
      try {
         const response = await postUserTest(testId)
         return response.data
      } catch (error) {
         return thunkAPI.rejectWithValue(error.message)
      }
   }
)
