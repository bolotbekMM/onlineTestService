import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import Button from '../../../components/UI/button/index'
import CountTime from '../../../components/UI/progressTime/CountTime'
import LayoutTest from '../../../layout/clientLayout/testLayout/LayoutTest'
import { submitQuestion1 } from '../../../store/testActions'
import { ROUTES } from '../../../utils/constants/general'
import { QUESTION_TYPES } from '../../../utils/constants/QuestionTypesAndOptions'

function UserRespondInAtLeastNWords() {
   const [testQuestion, setTestQuestion] = useState({})
   const [answer, setAnswer] = useState('')
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const { testId } = useParams()
   const { questions } = useSelector((state) => state.test)
   const { currentQuestion } = useSelector((state) => state.test)
   const attemptId = useSelector((state) => state.test.attemptId)

   useEffect(() => {
      setTestQuestion(questions[currentQuestion])
      if (questions.length === 0) {
         return navigate('/user/tests')
      }
      return null
   }, [])

   const countOfWords = () => {
      return answer
         .trim()
         .split(' ')
         .filter((i) => i).length
   }

   const onChangeWords = (event) => {
      setAnswer(event.target.value)
   }

   const respondLeastWordsHandler = (e) => {
      e.preventDefault()
      try {
         const answers = {
            answer,
            type: QUESTION_TYPES.RESPOND_IN_AT_LEAST_N_WORDS,
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

   const enabled = () => countOfWords() >= testQuestion.count

   return (
      <LayoutTest>
         <CountTime
            time={testQuestion.duration}
            totalTime={testQuestion.duration}
         />
         <HeaderTitle>{testQuestion.title}</HeaderTitle>
         <Div>
            <Text>
               <P>{testQuestion.statement}</P>
            </Text>
            <TextAreaDiv>
               <TextArea onChange={onChangeWords} />
               <Footer isEnabled={!enabled()}>Words: {countOfWords()}</Footer>
            </TextAreaDiv>
         </Div>
         <FooterDiv>
            <Button
               onClick={respondLeastWordsHandler}
               disabled={!enabled()}
               color="primary"
               variant="contained"
               sx={{ width: '143px' }}
            >
               NEXT
            </Button>
         </FooterDiv>
      </LayoutTest>
   )
}

export default UserRespondInAtLeastNWords
const Footer = styled.h4`
   margin: 0 auto;
   margin-top: 10px;
   font-family: 'DINNextRoundedLTW01';
   font-size: 16px;
   color: ${({ isEnabled }) => (isEnabled ? '#afafaf' : '#3a10e5')};
`
const FooterDiv = styled.div`
   margin-top: 90px;
   border-top: 2px solid #d4d0d0;
   padding-top: 32px;
   display: flex;
   justify-content: flex-end;
`
const TextAreaDiv = styled.div`
   width: 382px;
`
const TextArea = styled.textarea`
   width: 348px;
   height: 169px;
   padding: 14px 16px;
   border-radius: 8px;
   resize: none;
   font-family: 'DINNextRoundedLTW01';
   font-size: 16px;
   color: #4c4859;
`

const P = styled.p`
   margin: 0 auto;
   font-family: 'DINNextRoundedLTW01';
   font-size: 18px;
   color: #4c4859;
`

const Text = styled.div`
   width: 330px;
`
const Div = styled.div`
   margin-top: 50px;
   display: flex;
   justify-content: space-between;
`

const HeaderTitle = styled.p`
   margin: 0 auto;
   margin-top: 50px;
   font-family: 'DINNextRoundedLTW01';
   font-size: 28px;
   color: #4c4859;
   display: flex;
   justify-content: center;
`
