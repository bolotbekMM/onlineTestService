import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import Button from '../../../components/UI/button/index'
import CountTimeLong from '../../../components/UI/progressTimeLong/CountTimeLong'
import LayoutFinal from '../../../layout/clientLayout/LayoutFinal/LayoutFinal'
import { submitQuestion1 } from '../../../store/testActions'
import { ROUTES } from '../../../utils/constants/general'
import { QUESTION_TYPES } from '../../../utils/constants/QuestionTypesAndOptions'
import UserSelectTheMainIdeaOption from './UserSelectTheMainIdeaOption'

function UserSelectTheMainIdea() {
   const [testQuestion, setTestQuestion] = useState([])
   const navigate = useNavigate()
   const { testId } = useParams()
   const dispatch = useDispatch()
   const { questions } = useSelector((state) => state.test)
   const { currentQuestion } = useSelector((state) => state.test)
   const [resultOptions, setResultOptions] = useState()
   const attemptId = useSelector((state) => state.test.attemptId)

   useEffect(() => {
      setTestQuestion(questions[currentQuestion])
      if (questions.length === 0) {
         return navigate('/user/tests')
      }
      return null
   }, [])

   const onChangeRadioButtonHandler = (checkedData) => {
      setResultOptions([checkedData])
   }

   const selectTheMainHandler = () => {
      try {
         const answers = {
            resultOptions,
            type: QUESTION_TYPES.SELECT_MAIN_IDEA,
            questionId: testQuestion.id,
            testResultId: attemptId,
         }
         dispatch(submitQuestion1(answers)).then(() => {
            if (questions.length === currentQuestion + 1) {
               navigate(ROUTES.END_TEST)
            } else {
               navigate(
                  `/user/test/${testId}/${
                     ROUTES[questions[currentQuestion + 1]?.type]
                  }`
               )
            }
         })
      } catch (error) {
         console.error(error)
      }
   }

   return (
      <LayoutFinal>
         <CountTimeLong
            time={testQuestion?.duration}
            totalTime={testQuestion?.duration}
         />
         <Div>
            <div>
               <DivInput>PASSAGE</DivInput>
               <TextAreaDiv>
                  <TextArea />
               </TextAreaDiv>
            </div>
            <RightDiv>
               <Text>
                  <P>Select the best title for the passage</P>
               </Text>
               {testQuestion?.options &&
                  testQuestion?.options.map((option) => {
                     return (
                        <UserSelectTheMainIdeaOption
                           key={option.id}
                           name={option.id}
                           option={option}
                           onChangeRadioButtonHandler={
                              onChangeRadioButtonHandler
                           }
                        />
                     )
                  })}
               <FooterDiv>
                  <Button
                     onClick={selectTheMainHandler}
                     color="primary"
                     variant="contained"
                     sx={{ mt: '32px', width: '143px', height: '43px' }}
                  >
                     NEXT
                  </Button>
               </FooterDiv>
            </RightDiv>
         </Div>
      </LayoutFinal>
   )
}
export default UserSelectTheMainIdea

const DivInput = styled('div')`
   width: 522px;
   height: 17px;
   margin: 0 auto;
   border: 1px solid rgb(118, 118, 118);
   padding: 16px 34px;
   color: #4c4859;
   background-color: #d4d0d0;
   font-size: 16px;
   font-family: 'DINNextRoundedLTW04-Medium';
   border-radius: 8px 8px 0 0;
`
const RightDiv = styled.div`
   width: 390px;
   margin-left: 40px;
   display: flex;
   flex-direction: column;
`
const FooterDiv = styled.div`
   display: flex;
   justify-content: flex-end;
`
const TextAreaDiv = styled.div`
   width: 555px;
`
const TextArea = styled.textarea`
   width: 522px;
   height: 408px;
   padding: 28px 34px;
   border: 1px solid rgb(118, 118, 118);
   background-color: #d4d0d0;
   border-radius: 0 0 8px 8px;
   resize: none;
   font-family: 'DINNextRoundedLTW01';
   font-size: 16px;
   color: #4c4859;
`
const P = styled.p`
   margin: 0 auto;
   font-family: 'DINNextRoundedLTW01';
   font-size: 26px;
   color: #4c4859;
`
const Text = styled.div`
   width: 390px;
`
const Div = styled.div`
   display: flex;
   justify-content: space-between;
`
