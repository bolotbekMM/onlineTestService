import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import Button from '../../../components/UI/button/index'
import CountTime from '../../../components/UI/progressTime/CountTime'
import { GET_FILE_FROM_SERVER, ROUTES } from '../../../utils/constants/general'
import LayoutTest from '../../../layout/clientLayout/testLayout/LayoutTest'
import { submitQuestion1 } from '../../../store/testActions'
import { QUESTION_TYPES } from '../../../utils/constants/QuestionTypesAndOptions'

const DivStyled = styled('div')`
   margin-top: 50px;
   margin-bottom: 50px;
   display: flex;
   justify-content: center;
`
const StyledP = styled('p')`
   color: #4c4859;
   font-size: 28px;
   line-height: 32px;
`
const DivImgInput = styled('div')`
   display: flex;
   justify-content: center;
   margin-bottom: 89px;
`

const Img = styled('img')`
   width: 182px;
`
const Input = styled('textarea')`
   width: 382px;
   height: 183px;
   background: #ffffff;
   border: 1.53px solid #d4d0d0;
   box-sizing: border-box;
   border-radius: 8px;
   margin-left: 24px;
   resize: none;
   padding: 16px 14px;
`

const DivButton = styled('div')`
   margin-top: 90px;
   border-top: 2px solid #d4d0d0;
   padding-top: 32px;
   display: flex;
   justify-content: flex-end;
`
const ButtonS = styled(Button)`
   width: 143px;
`

const DescribeImage = () => {
   const navigate = useNavigate()
   const [testQuestion, setTestQuestion] = useState({})
   const { testId } = useParams()
   const dispatch = useDispatch()
   const { questions } = useSelector((state) => state.test)
   const attemptId = useSelector((state) => state.test.attemptId)
   const { currentQuestion } = useSelector((state) => state.test)

   useEffect(() => {
      setTestQuestion(questions[currentQuestion])
      if (questions.length === 0) {
         return navigate('/user/tests')
      }
      return null
   }, [])

   const [text, setText] = useState('')
   const onChangeText = (e) => setText(e.target.value)

   const submitTest = (e) => {
      e.preventDefault()
      try {
         const answers = {
            type: QUESTION_TYPES.DESCRIBE_IMAGE,
            answer: text,
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
         setText('')
      } catch (error) {
         console.error(error)
      }
      return null
   }

   const enabled = () => text.trim()
   return (
      <LayoutTest>
         <div>
            <div>
               <CountTime
                  time={testQuestion?.duration}
                  totalTime={testQuestion?.duration}
               />
            </div>
            <DivStyled>
               <StyledP>{testQuestion?.title}</StyledP>
            </DivStyled>
            <DivImgInput>
               <Img
                  src={`${GET_FILE_FROM_SERVER}/${testQuestion?.file}`}
                  alt="listen"
               />
               <Input
                  onChange={onChangeText}
                  type="text"
                  multiline
                  placeholder="Your response"
                  value={text}
               />
            </DivImgInput>
            <DivButton>
               <ButtonS
                  disabled={!enabled()}
                  color="primary"
                  variant="contained"
                  onClick={submitTest}
               >
                  NEXT
               </ButtonS>
            </DivButton>
         </div>
      </LayoutTest>
   )
}
export default DescribeImage
