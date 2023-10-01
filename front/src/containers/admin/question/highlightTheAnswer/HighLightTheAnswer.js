import React, { useState } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import HighlightTheAnswerTextField from './HighlightTheAnswerTextField'
import Input from '../../../../components/UI/input/index'
import Button from '../../../../components/UI/button/index'
import loading from '../../../../assets/icons/refresh.png'
import {
   addQuestionRequest,
   putQuestionRequest,
} from '../../../../api/testService'
import { testActions } from '../../../../store'
import NotificationIconModal from '../../../../components/UI/modal/NotificationIconModal'
import { ROUTES } from '../../../../utils/constants/general'

const StyledP = styled('p')`
   padding: 0;
   font-family: 'DINNextRoundedLTW01-Regular';
   font-style: normal;
   font-weight: 600;
   font-size: 16px;
   line-height: 18px;
   color: #4b4759;
`

const StyledDivOfFooter = styled('div')`
   width: 100%;
   display: flex;
   justify-content: flex-end;
`

const StyledSelected = styled('p')`
   text-decoration: underline transparent;
   &::selection {
      text-decoration: underline blue;
      color: blue;
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

const HighLightTheAnswer = () => {
   const navigate = useNavigate()
   const params = useParams()
   const { testById } = params

   const { title, duration, type, testId, optionss, questionByIdd } =
      useSelector((state) => state.questions)
   const [passage, setPassage] = React.useState('')
   const [highlighted, sethighlighted] = React.useState('')

   const transformedType = type.replace(/[\s.,%]/g, '')
   const dispatch = useDispatch()
   const [questionStatement, setQuestionStatement] = React.useState('')
   const enabled = () => {
      return (
         questionStatement.trim() &&
         title.trim() &&
         duration.trim() &&
         passage.trim() &&
         highlighted.trim()
      )
   }

   React.useEffect(() => {
      if (questionByIdd) {
         setQuestionStatement(optionss.statement)
         setPassage(optionss.passage)
         sethighlighted(optionss.correctAnswer)
      }
   }, [])

   const onChangeHandlerinput = (props) => {
      setPassage(props)
   }

   const questionsPassegeChangeHandler = (e) => {
      setQuestionStatement(e.target.value)
   }

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

   const [formValue, setFormValue] = useState('')
   const [message, setMesage] = useState('')
   const [isModal, setIsModal] = useState(false)
   const [error, setError] = useState(null)
   const [isLoading, setIsLoading] = useState(false)

   const clearHighLightState = () => {
      setPassage('')
      setQuestionStatement('')
   }

   const highlightSumbitHAndler = async (e) => {
      e.preventDefault()
      try {
         if (!questionByIdd) {
            setIsLoading(true)
            const correctAnswer = highlighted
            const data = {
               testId,
               type: transformedType,
               title,
               duration,
               passage,
               questionStatement,
               correctAnswer,
            }
            const response = await addQuestionRequest(data)
            setFormValue(response.status)
         }
         if (questionByIdd) {
            setIsLoading(true)
            const correctAnswer = highlighted
            const data = {
               testId: +testById,
               type: transformedType,
               title,
               duration,
               passage,
               questionStatement,
               correctAnswer,
            }
            const response = await putQuestionRequest(questionByIdd, data)
            setFormValue(response.status)
         }
         setMesage('Question is saved')
         setIsModal(true)
         setIsLoading(false)
      } catch (error) {
         setIsModal(true)
         setMesage('Unable to save question')
         setError(error.message)
      }
   }
   const onCloseModalHidLigtHandler = () => {
      if (questionByIdd) {
         navigate(`${ROUTES.ADD_TEST_PAGE}/${testById}`)
      }
      if (!questionByIdd) {
         navigate(`${ROUTES.ADD_TEST_PAGE}/${testId}`)
      }
      dispatch(testActions.resetQuestion())
      clearHighLightState()
      setIsModal((prev) => !prev)
   }

   const onGoBackHandler = () => {
      dispatch(testActions.resetQuestion())
      clearHighLightState()
      if (questionByIdd) {
         navigate(`${ROUTES.ADD_TEST_PAGE}/${testById}`)
      }
      if (!questionByIdd) {
         navigate(`${ROUTES.ADD_TEST_PAGE}/${testId}`)
      }
   }

   return (
      <form onSubmit={highlightSumbitHAndler}>
         <NotificationIconModal
            open={isModal}
            onConfirm={onCloseModalHidLigtHandler}
            error={error}
            success={formValue}
            message={message}
         />
         <div style={{ margin: '30px 0px 32px', width: '100%' }}>
            <StyledP>Questions to the Passage</StyledP>
            <Input
               value={questionStatement}
               onChange={questionsPassegeChangeHandler}
               sx={{ width: '100%' }}
            />
            <StyledP>Passage</StyledP>
            <HighlightTheAnswerTextField
               onChageHandler={onChangeHandlerinput}
               value={passage}
            />

            <StyledP>Highlight correct answer:</StyledP>
            <StyledSelected onMouseUp={onMouse}>{passage}</StyledSelected>
         </div>

         <StyledDivOfFooter>
            <Button
               onClick={onGoBackHandler}
               color="primary"
               variant="outlined"
               sx={{ mr: '16px' }}
            >
               GO BACK
            </Button>
            <Button
               disabled={!enabled()}
               type="submit"
               color="secondary"
               variant="contained"
            >
               {!isLoading ? (
                  <span>SAVE</span>
               ) : (
                  <Styledloading src={loading} alt="loading" />
               )}
            </Button>
         </StyledDivOfFooter>
      </form>
   )
}

export default HighLightTheAnswer
