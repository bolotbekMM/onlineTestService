import { createSlice } from '@reduxjs/toolkit'

const initialState = {
   title: '',
   type: '',
   duration: '',
   testId: '',
   questionByIdd: '',
   optionss: '',
}

const questionSlice = createSlice({
   name: 'questions',
   initialState,
   reducers: {
      setTitle(state, action) {
         state.title = action.payload
      },
      setType(state, action) {
         state.type = action.payload
      },
      setDuration(state, action) {
         state.duration = action.payload
      },
      setTestId(state, action) {
         state.testId = action.payload
      },
      setOptions(state, action) {
         state.optionss = action.payload
      },
      setQuestionId(state, action) {
         state.questionByIdd = action.payload
      },
      resetQuestion() {
         return initialState
      },
   },
})

export default questionSlice
