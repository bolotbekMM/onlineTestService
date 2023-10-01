/* eslint-disable jsx-a11y/media-has-caption */
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import MicRecorder from 'mic-recorder-to-mp3'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { submitQuestion1 } from '../../../store/testActions'
import { ReactComponent as Head } from '../../../assets/icons/Head.svg'
import { ReactComponent as Ellipse } from '../../../assets/icons/Ellipse.svg'
import Button from '../../../components/UI/button/index'
import LayoutTest from '../../../layout/clientLayout/testLayout/LayoutTest'
import { ROUTES } from '../../../utils/constants/general'
import CountTime from '../../../components/UI/progressTime/CountTime'
import { QUESTION_TYPES } from '../../../utils/constants/QuestionTypesAndOptions'
import { postFileRequest } from '../../../api/testService'

const Mp3Recorder = new MicRecorder({ bitRate: 128 })

function UserRecordSayingStatement() {
   const navigate = useNavigate()
   const dispatch = useDispatch()
   const { currentQuestion } = useSelector((state) => state.test)
   const { questions } = useSelector((state) => state.test)
   const { testId } = useParams()
   const [testQuestion, setTestQuestion] = useState({})
   const attemptId = useSelector((state) => state.test.attemptId)
   const [showButton, setShowButton] = useState(true)
   const [record, setRecord] = useState({
      isRecording: false,
      blobURL: '',
   })

   useEffect(() => {
      navigator.getUserMedia(
         { audio: true },
         () => {
            setRecord({ isBlocked: false })
         },
         () => {
            setRecord({ isBlocked: true })
         }
      )
   }, [])

   const start = () => {
      onClickHandler()
      Mp3Recorder.start().then(() => {
         setRecord({ isRecording: true })
      })
   }

   useEffect(() => {
      setTestQuestion(questions[currentQuestion])
      if (questions.length === 0) {
         return navigate('/user/tests')
      }
      return null
   }, [])

   function sendFileToApi(file) {
      const formData = new FormData()
      formData.append('file', file)
      return postFileRequest(formData)
   }

   const stop = async (e) => {
      e.preventDefault()
      await Mp3Recorder.getMp3().then(async ([buffer, blob]) => {
         const blobURL = URL.createObjectURL(blob)
         setRecord({ blobURL, isRecording: false })
         const file = new File(buffer, 'me-at-thevoice.mp3', {
            type: blob.type,
            lastModified: Date.now(),
         })
         const data = await sendFileToApi(file)

         const answers = {
            file: data.data,
            type: QUESTION_TYPES.RECORD_SAYING_STATEMENT,
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
      })
   }

   const onClickHandler = () => {
      setShowButton((prev) => !prev)
   }

   return (
      <LayoutTest>
         <CountTime
            time={testQuestion.duration}
            totalTime={testQuestion.duration}
         />
         <HeaderTitle>{testQuestion.title}</HeaderTitle>
         <Main>
            <div>
               <ImHead />
            </div>
            <div>
               <H3>{testQuestion.statement}</H3>
            </div>
         </Main>
         <FooterDiv>
            <audio src={record.blobURL} controls="controls" />
            {showButton && (
               <ButtonDiv>
                  <Button
                     onClick={start}
                     color="primary"
                     variant="contained"
                     sx={{ width: '143px' }}
                  >
                     RECORD NOW
                  </Button>
               </ButtonDiv>
            )}
            {!showButton && (
               <ButtonShow>
                  <Div>
                     <Ellipse /> <P>RECORDING...</P>
                  </Div>
                  <Loader>
                     <span /> <span /> <span /> <span /> <span /> <span />
                     <span /> <span /> <span /> <span />
                  </Loader>
                  <Button
                     onClick={stop}
                     color="primary"
                     variant="contained"
                     sx={{ width: '143px' }}
                  >
                     NEXT
                  </Button>
               </ButtonShow>
            )}
         </FooterDiv>
      </LayoutTest>
   )
}
export default UserRecordSayingStatement
const Loader = styled.div`
   height: 30px;
   display: flex;
   align-items: center;
   span {
      display: block;
      position: relative;
      background: #3a10e5;
      height: 100%;
      width: 3px;
      border-radius: 50px;
      margin: 0 4px;
      animation: animate 1.2s linear infinite;
   }
   @keyframes animate {
      50% {
         height: 20%;
      }
      100% {
         height: 100%;
      }
   }
   span:nth-child(1) {
      animation-delay: 0s;
   }
   span:nth-child(2) {
      animation-delay: 0.3s;
   }
   span:nth-child(3) {
      animation-delay: 0.6s;
   }
   .span:nth-child(4) {
      animation-delay: 0.9s;
   }
   span:nth-child(5) {
      animation-delay: 0.6s;
   }
   span:nth-child(6) {
      animation-delay: 0.3s;
   }
   span:nth-child(7) {
      animation-delay: 0s;
   }
   span:nth-child(8) {
      animation-delay: 0.3s;
   }
   span:nth-child(9) {
      animation-delay: 0.6s;
   }
   span:nth-child(10) {
      animation-delay: 0.9s;
   }
`
const ButtonDiv = styled.div`
   display: flex;
   justify-content: flex-end;
`
const ButtonShow = styled.div`
   display: flex;
   align-items: center;
   justify-content: space-between;
`
const Div = styled.div`
   display: flex;
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
const Main = styled.div`
   margin: 0 auto;
   width: 305px;
   margin-top: 51px;
   margin-bottom: 131px;
   display: flex;
   justify-content: space-between;
   align-items: center;
`

const ImHead = styled(Head)`
   width: 117px;
   height: 100px;
`
const FooterDiv = styled.div`
   border-top: 2px solid #d4d0d0;
   padding-top: 32px;
`
const P = styled.p`
   margin: 0 auto;
   margin-left: 10px;
   font-weight: 600;
   font-family: 'DINNextRoundedLTW01';
   font-size: 16px;
   color: #3a10e5;
`
const H3 = styled.p`
   font-family: 'DINNextRoundedLTW01-Regular';
   font-size: 18px;
   color: #4c4859;
   margin-left: 20px;
   margin-bottom: 35px;
`
