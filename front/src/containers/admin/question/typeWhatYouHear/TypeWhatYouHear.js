/* eslint-disable jsx-a11y/media-has-caption */
import React, { useState } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { Stack } from '@mui/material'
import start from '../../../../assets/icons/start.svg'
import stop from '../../../../assets/icons/stop.svg'
import loading from '../../../../assets/icons/refresh.png'
import Input from '../../../../components/UI/input/index'
import Button from '../../../../components/UI/button/index'
import {
   postFileRequest,
   addQuestionRequest,
   putQuestionRequest,
} from '../../../../api/testService'
import { testActions } from '../../../../store'
import NotificationIconModal from '../../../../components/UI/modal/NotificationIconModal'
import {
   GET_FILE_FROM_SERVER,
   ROUTES,
} from '../../../../utils/constants/general'

const StyledP = styled('p')`
   padding: 0;
   font-family: 'DINNextRoundedLTW01-Regular';
   font-style: normal;
   font-weight: 600;
   font-size: 16px;
   line-height: 18px;
   color: #4b4759;
`

const InputNumber = styled(Input)`
   width: 83px;
`

const StyledStack = styled(Stack)`
   position: relative;
   left: 50px;
   top: 3px;
`

const InputStack = styled(Input)`
   display: none;
`

const DivUppload = styled('div')`
   display: flex;
   justify-content: space-between;
   align-items: center;
   width: 881px;
   height: 60px;
`

const ImgStart = styled('img')`
   cursor: pointer;
`

const InputCorrectAnswer = styled(Input)`
   width: 900px;
   height: 70px;
`

const DivFooterSave = styled('div')`
   display: flex;
   width: 250px;
   justify-content: flex-end;
   justify-content: space-around;
   position: relative;
   left: 670px;
   top: 32px;
`

const ButtonSave = styled(Button)`
   &.MuiButton-root {
      border: none;
   }
`
const Styledloading = styled.img`
   width: 20px;
   height: 20px;
   animation-name: rotate;
   animation-duration: 3s;
   animation-iteration-count: infinite;
   animation-timing-function: linear;
   @keyframes rotate {
      from {
         transform: rotate(360deg);
      }
      to {
         transform: rotate(-360deg);
      }
   }
`

const TypeWhatYouHear = () => {
   const [question, setQuestion] = useState({
      correctAnswer: '',
      fileName: '',
      attemptNumber: '',
   })
   const { title, duration, type, testId, optionss, questionByIdd } =
      useSelector((state) => state.questions)
   console.log(optionss, 'optionss')
   const [audio, setAudio] = useState({ file: null, play: null })

   const getFileByFileName = async () => {
      const newAudio = new Audio()
      newAudio.src = `${GET_FILE_FROM_SERVER}/${optionss.file}`
      newAudio.controls = true
      setAudio((prevState) => ({ ...prevState, play: newAudio }))
   }

   React.useEffect(async () => {
      if (questionByIdd) {
         setQuestion({
            correctAnswer: optionss.correctAnswer,
            fileName: optionss.file,
            attemptNumber: optionss.attempt,
         })

         await getFileByFileName()
      }
      return ''
   }, [])

   const [startStop, setStartStop] = useState(true)
   const transformedType = type.replace(/[\s.,%]/g, '')
   const dispatch = useDispatch()
   const { correctAnswer, attemptNumber } = question

   const enabled = () => {
      return (
         audio.play && title.trim() && duration.trim() && correctAnswer.trim()
      )
   }

   const onQuestionChangeHandler = (e) => {
      setQuestion((prev) => ({
         ...prev,
         [e.target.name]: e.target.value,
      }))
   }

   const clearState = () => {
      setAudio({ file: {} })
      setQuestion({ correctAnswer: '', attemptNumber: '' })
   }

   function sendFileToApi() {
      if (audio.file) {
         const formData = new FormData()
         formData.append('file', audio.file)
         const response = postFileRequest(formData)
         return response
      }
      return optionss.file
   }

   const navigate = useNavigate()
   const params = useParams()
   const { testById } = params

   const stopAudio = () => {
      setStartStop(true)
      audio.play.pause()
   }

   const playAudio = () => {
      setStartStop(false)
      audio.play.play()
   }

   const onChangeAudioHandler = (e) => {
      if (e.target.files[0]) {
         setAudio({
            file: e.target.files[0],
            play: new Audio(URL.createObjectURL(e.target.files[0])),
         })
      }
   }

   const [isModal, setIsModal] = useState(false)
   const [message, setMessage] = useState('')
   const [error, setError] = useState(null)
   const [datas, setDatas] = useState('')
   const [isLoading, setIsLoading] = useState(false)
   const submitPrintHearHandler = async (e) => {
      e.preventDefault()
      try {
         const attempt = +attemptNumber
         if (!questionByIdd) {
            setIsLoading(true)
            const responseAudio = await sendFileToApi()
            const data = {
               testId,
               type: transformedType,
               title,
               duration,
               attempt,
               correctAnswer,
               file: responseAudio.data.id,
            }
            const responseResult = await addQuestionRequest(data)
            setDatas(responseResult.status)
         }
         if (questionByIdd) {
            setIsLoading(true)
            const responseAudio = await sendFileToApi()
            const data = {
               testId: +testById,
               type: transformedType,
               title,
               duration,
               attempt,
               correctAnswer,
               file: responseAudio.data ? responseAudio.data.id : responseAudio,
            }

            const responseResult = await putQuestionRequest(questionByIdd, data)
            setDatas(responseResult.status)
         }
         setIsLoading(false)
         setMessage('Question is saved')
         setIsModal(true)
      } catch (error) {
         setIsModal(true)
         setMessage('Unable to save question')
         setError(error.message)
      }
   }

   const onCloseModalHandler = () => {
      if (questionByIdd) {
         navigate(`${ROUTES.ADD_TEST_PAGE}/${testById}`)
      }
      if (!questionByIdd) {
         navigate(`${ROUTES.ADD_TEST_PAGE}/${testId}`)
      }
      dispatch(testActions.resetQuestion())
      clearState()
      setIsModal((prevState) => !prevState)
   }

   const onGoBackHandler = () => {
      dispatch(testActions.resetQuestion())
      clearState()
      if (questionByIdd) {
         navigate(`${ROUTES.ADD_TEST_PAGE}/${testById}`)
      }
      if (!questionByIdd) {
         navigate(`${ROUTES.ADD_TEST_PAGE}/${testId}`)
      }
   }

   const isShowIcon = () => {
      if (audio.play) {
         return startStop ? (
            <ImgStart src={start} onClick={playAudio} alt="start" />
         ) : (
            <ImgStart src={stop} onClick={stopAudio} alt="stop" />
         )
      }
      return null
   }

   return (
      <form onSubmit={submitPrintHearHandler}>
         <NotificationIconModal
            open={isModal}
            onConfirm={onCloseModalHandler}
            error={error}
            success={datas}
            message={message}
         />
         <div>
            <StyledP>Number off Replays</StyledP>
            <DivUppload>
               <InputNumber
                  type="number"
                  name="attemptNumber"
                  value={question.attemptNumber}
                  onChange={onQuestionChangeHandler}
               />
               <StyledStack direction="row" alignItems="center" spacing={2}>
                  <label htmlFor="contained-button-file">
                     <InputStack
                        inputProps={{
                           accept: 'audio/*',
                        }}
                        id="contained-button-file"
                        multiple
                        type="file"
                        onChange={onChangeAudioHandler}
                     />
                     <Button variant="outlined" component="span">
                        Upload
                     </Button>
                  </label>
                  {isShowIcon()}
               </StyledStack>
            </DivUppload>
         </div>
         <StyledP>Correct answer</StyledP>
         <InputCorrectAnswer
            multiline
            name="correctAnswer"
            value={question.correctAnswer}
            onChange={onQuestionChangeHandler}
         />
         <DivFooterSave>
            <Button onClick={onGoBackHandler} variant="outlined">
               GO BACK
            </Button>
            <ButtonSave
               disabled={!enabled()}
               type="sumbit"
               variant="contained"
               color="success"
            >
               {!isLoading ? (
                  <span>SAVE</span>
               ) : (
                  <Styledloading src={loading} alt="loading" />
               )}
            </ButtonSave>
         </DivFooterSave>
      </form>
   )
}
export default TypeWhatYouHear
