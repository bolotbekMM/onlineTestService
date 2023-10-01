import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { TextField } from '@mui/material'
import Button from '../../../components/UI/button/index'
import LayoutFinal from '../../../layout/clientLayout/LayoutFinal/LayoutFinal'
import { ROUTES } from '../../../utils/constants/general'
import CountTimeLong from '../../../components/UI/progressTimeLong/CountTimeLong'
import { submitQuestion1 } from '../../../store/testActions'
import { QUESTION_TYPES } from '../../../utils/constants/QuestionTypesAndOptions'

function UserHighlightTheAnswer() {
   const [highlighted, sethighlighted] = useState('')
   const [state, setState] = useState({})
   const navigate = useNavigate()
   const dispatch = useDispatch()
   const attemptId = useSelector((state) => state.test.attemptId)
   const { questions } = useSelector((state) => state.test)
   const { currentQuestion } = useSelector((state) => state.test)
   const { testId } = useParams()

   useEffect(() => {
      setState(questions[currentQuestion])
      if (questions.length === 0) {
         return navigate('/user/tests')
      }
      return null
   }, [])

   const onMouse = () => {
      let selectedText = ''
      if (window.getSelection()) {
         selectedText = window.getSelection()
      } else if (document.getSelection()) {
         selectedText = document.getSelection()
      } else if (document.selection) {
         selectedText = document.selection.createRange().text
      }

      sethighlighted(selectedText.toString())
   }
   const highlightAnswerHandler = (e) => {
      e.preventDefault()
      try {
         const answers = {
            type: QUESTION_TYPES.HIGHLIGHT_THE_ANSWER,
            answer: highlighted,
            questionId: state.id,
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

   const enabled = () => highlighted.trim()

   return (
      <LayoutFinal>
         <CountTimeLong time={state?.duration} totalTime={state?.duration} />
         <Div>
            <div>
               <DivInput>PASSAGE</DivInput>
               <TextAreaDiv>
                  <TextArea onMouseUp={onMouse} value={state.passage} />
               </TextAreaDiv>
            </div>
            <RightDiv>
               <Text>
                  <P>
                     Click and drad text to highlight the answer to the question
                     below
                  </P>
                  <Question>{state.statement}</Question>
                  <Inputt value={highlighted} multiline fullWidth />
               </Text>
               <FooterDiv>
                  <Button
                     onClick={highlightAnswerHandler}
                     disabled={!enabled()}
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

export default UserHighlightTheAnswer

const Inputt = styled(TextField)`
   margin-top: 13px;
   width: 390px;
   border-radius: 8px;
`
const Question = styled.p`
   margin: 0 auto;
   margin-top: 33px;
   font-family: 'DINNextRoundedLTW01';
   font-size: 18px;
   color: #4c4859;
`

const DivInput = styled('div')`
   width: 522px;
   height: 17px;
   margin: 0 auto;
   border: 1px solid rgb(118, 118, 118);
   padding: 16px 34px;
   color: #4c4859;
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
   height: 169px;
   padding: 28px 34px;
   border: 1px solid rgb(118, 118, 118);

   border-radius: 0 0 8px 8px;
   resize: none;
   font-family: 'DINNextRoundedLTW01';
   font-size: 16px;
   color: #4c4859;
   &::selection {
      text-decoration: underline blue;
      background-color: #dcd4fa;
   }
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
