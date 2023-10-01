import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import listen from '../../../assets/icons/listen.svg'
import LayoutClient from '../../../layout/clientLayout/layoutClient/LayoutClient'
import CountTime from '../../../components/UI/progressTime/CountTime'
import Button from '../../../components/UI/button/index'
import { GET_FILE_FROM_SERVER, ROUTES } from '../../../utils/constants/general'
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
   align-items: center;
`
const Img = styled('img')``
const Textarea = styled('textarea')`
   width: 439px;
   height: 131px;
   background: #ffffff;
   border: 1.53px solid #d4d0d0;
   box-sizing: border-box;
   border-radius: 8px;
   margin-left: 94px;
   resize: none;
`
const DivNumber = styled('div')`
   display: flex;
   justify-content: center;
   color: #afafaf;
   font-size: 16px;
   line-height: 124%;
   width: 730px;
   margin-bottom: 89px;
`
const DivButton = styled('div')`
   margin-top: 90px;
   border-top: 2px solid #d4d0d0;
   padding-top: 32px;
   display: flex;
   justify-content: flex-end;
   background-image: src;
`
const UserTypeWhatYouHear = () => {
   const navigate = useNavigate()
   const [testQuestion, setTestQuestion] = useState({})
   const [text, setText] = useState('')
   const [playCount, setPlayCount] = useState(0)
   const { currentQuestion } = useSelector((state) => state.test)
   const [minusCount, setMinusCount] = useState(0)
   const { questions } = useSelector((state) => state.test)
   const attemptId = useSelector((state) => state.test.attemptId)
   const { testId } = useParams()
   const dispatch = useDispatch()
   const [audio, setAudio] = useState(null)

   useEffect(() => {
      try {
         setTestQuestion(questions[currentQuestion])

         if (questions.length === 0) {
            return navigate('/user/tests')
         }
         const newAudio = new Audio(
            `${GET_FILE_FROM_SERVER}/${questions[currentQuestion].file}`
         )
         setAudio(newAudio)
         return setMinusCount(questions[currentQuestion].count)
      } catch (error) {
         console.error(error.message)
      }
      return ''
   }, [])

   const playAudioHandler = () => {
      if (testQuestion.count === playCount) return null
      audio.play()
      setMinusCount((prev) => prev - 1)
      return setPlayCount(playCount + 1)
   }

   const onChangeText = (event) => {
      setText(event.target.value)
   }

   const enabled = () => text.trim()

   const submitTestWhatYouHear = (e) => {
      e.preventDefault()
      try {
         const answers = {
            type: QUESTION_TYPES.TYPE_WHAT_YOU_HEAR,
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

   return (
      <LayoutClient>
         <div>
            <CountTime
               time={testQuestion?.duration}
               totalTime={testQuestion?.duration}
            />
            <DivStyled>
               <StyledP>Type the statement you hear</StyledP>
            </DivStyled>
            <DivImgInput>
               <Img
                  style={{
                     filter:
                        testQuestion?.count === playCount ? 'grayscale(1)' : '',
                  }}
                  role="presentation"
                  onClick={playAudioHandler}
                  src={listen}
                  alt="listen"
               />
               <Textarea
                  onChange={onChangeText}
                  type="text"
                  multiline
                  placeholder="Your response"
               />
            </DivImgInput>
            <DivNumber>
               <p>number of replays left: {minusCount}</p>
            </DivNumber>
         </div>
         <DivButton>
            <Button
               onClick={submitTestWhatYouHear}
               disabled={!enabled()}
               color="primary"
               variant="contained"
               sx={{ width: '143px' }}
            >
               NEXT
            </Button>
         </DivButton>
      </LayoutClient>
   )
}
export default UserTypeWhatYouHear
