import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { useNavigate, useParams } from 'react-router-dom'
import Input from '../../../../components/UI/input/index'
import Button from '../../../../components/UI/button/index'
import loading from '../../../../assets/icons/refresh.png'
import { testActions } from '../../../../store'
import {
   addQuestionRequest,
   putQuestionRequest,
} from '../../../../api/testService'
import NotificationIconModal from '../../../../components/UI/modal/NotificationIconModal'
import { ROUTES } from '../../../../utils/constants/general'

const RespondInAtLeastNWords = () => {
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const params = useParams()
   const { testById } = params
   const { title, duration, type, testId, optionss, questionByIdd } =
      useSelector((state) => state.questions)

   const [questionStatement, setQuestionStatement] = useState('')
   const [numberOfWords, setNumberOfWords] = useState('')
   const [isModal, setIsModal] = useState(false)
   const [message, setMessage] = useState('')
   const [error, setError] = useState(null)
   const [datas, setDatas] = useState('')
   const [isLoading, setIsLoading] = useState(false)

   const enabled = () => {
      return (
         questionStatement &&
         // numberOfWords.trim() &&
         title &&
         duration
      )
   }

   React.useEffect(() => {
      if (questionByIdd) {
         setQuestionStatement(optionss.questionStatement)
         setNumberOfWords(optionss.countOfWords)
      }
   }, [])

   const statementRespond = (event) => {
      setQuestionStatement(event.target.value)
   }
   const respondOfNumbers = (event) => {
      setNumberOfWords(event.target.value)
   }

   const respondLeastWordsHandler = async (event) => {
      event.preventDefault()
      console.log(testId, testById, params)
      try {
         if (!questionByIdd) {
            setIsLoading(true)
            const countOfWords = +numberOfWords
            const respondData = {
               testId,
               type,
               title,
               duration,
               questionStatement,
               countOfWords,
            }
            const response = await addQuestionRequest(respondData)
            setDatas(response.status)
         }
         if (questionByIdd) {
            setIsLoading(true)
            const countOfWords = +numberOfWords
            const respondData = {
               testId: testById,
               type,
               title,
               duration,
               questionStatement,
               countOfWords,
            }
            const response = await putQuestionRequest(
               questionByIdd,
               respondData
            )
            setDatas(response.status)
         }
         setMessage('Question is saved')
         setIsModal(true)
         setIsLoading(false)
      } catch (error) {
         setIsModal(true)
         setMessage('Unable to save question')
         setError(error.message)
      }
   }

   const onGoBackHandler = () => {
      dispatch(testActions.resetQuestion())
      setQuestionStatement('')
      setNumberOfWords('')
      if (questionByIdd) {
         navigate(`${ROUTES.ADD_TEST_PAGE}/${testById}`)
      }
      if (!questionByIdd) {
         navigate(`${ROUTES.ADD_TEST_PAGE}/${testId}`)
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
      setQuestionStatement('')
      setNumberOfWords('')
      setIsModal((prevState) => !prevState)
   }

   return (
      <Div>
         <NotificationIconModal
            open={isModal}
            onConfirm={onCloseModalHandler}
            error={error}
            success={datas}
            message={message}
         />
         <StyledP>Question statement</StyledP>
         <Input
            multiline
            value={questionStatement}
            onChange={statementRespond}
         />
         <StyledP>Number of minimum words</StyledP>
         <Input
            value={numberOfWords}
            onChange={respondOfNumbers}
            style={{ width: '83px' }}
         />
         <StyledDivOfModalFooter>
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
               onClick={respondLeastWordsHandler}
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
         </StyledDivOfModalFooter>
      </Div>
   )
}

export default RespondInAtLeastNWords

const Div = styled.div`
   margin-top: 30px;
`

const StyledP = styled.p`
   padding: 0;
   font-family: 'DINNextRoundedLTW01-Regular';
   font-style: normal;
   font-weight: 600;
   font-size: 16px;
   line-height: 18px;
   color: #4b4759;
`

const StyledDivOfModalFooter = styled.div`
   width: 100%;
   display: flex;
   justify-content: flex-end;
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
