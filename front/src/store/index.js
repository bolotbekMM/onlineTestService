import { configureStore } from '@reduxjs/toolkit'
import authSlice from './auth'
import questionSlice from './questions'
import testSlice from './testSlice'

const store = configureStore({
   reducer: {
      auth: authSlice.reducer,
      questions: questionSlice.reducer,
      test: testSlice.reducer,
   },
})

export const testActions = questionSlice.actions
export const authActions = authSlice.actions
export const testSliceActions = testSlice.actions

export default store
