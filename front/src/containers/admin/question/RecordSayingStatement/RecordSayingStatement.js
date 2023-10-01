import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import {
   addQuestionRequest,
   putQuestionRequest,
} from '../../../../api/testService'
import Button from '../../../../components/UI/button/index'
import loading from '../../../../assets/icons/refresh.png'
import NotificationIconModal from '../../../../components/UI/modal/NotificationIconModal'
import { testActions } from '../../../../store'
import { ROUTES } from '../../../../utils/constants/general'

const RecordSayingStatement = () => {
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const params = useParams()
   const { testById } = params
   const { title, duration, type, testId, optionss, questionByIdd } =
      useSelector((state) => state.questions)

   const [statement, setStatement] = useState('')
   const [isModal, setIsModal] = useState(false)
   const [message, setMessage] = useState('')
   const [error, setError] = useState(null)
   const [datas, setDatas] = useState('')
   const [isLoading, setIsLoading] = useState(false)

   const enabled = () => statement.trim() && title.trim() && duration.trim()

   const statementRecord = (event) => {
      setStatement(event.target.value)
   }
   React.useEffect(() => {
      if (questionByIdd) {
         setStatement(optionss.statement)
      }
   }, [])

   const recordSayingHandler = async (event) => {
      event.preventDefault()
      try {
         if (!questionByIdd) {
            setIsLoading(true)
            const recordData = {
               testId,
               type,
               title,
               duration,
               statement,
            }
            const response = await addQuestionRequest(recordData)
            setDatas(response.status)
         }
         if (questionByIdd) {
            setIsLoading(true)
            const recordData = {
               testId: testById,
               type,
               title,
               duration,
               statement,
            }
            const response = await putQuestionRequest(questionByIdd, recordData)
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
      setStatement('')
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
      setStatement('')
      setIsModal((prevState) => !prevState)
   }

   return (
      <Div style={{ marginTop: '30px' }}>
         <NotificationIconModal
            open={isModal}
            onConfirm={onCloseModalHandler}
            error={error}
            success={datas}
            message={message}
         />
         <StyledSpan>Statement</StyledSpan>
         <StyledInput value={statement} onChange={statementRecord} />
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
               onClick={recordSayingHandler}
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

export default RecordSayingStatement

const Div = styled.div`
   margin-top: 30px;
`

const StyledSpan = styled.span`
   padding: 0;
   font-family: 'DINNextRoundedLTW01-Regular';
   font-style: normal;
   font-weight: 600;
   font-size: 16px;
   line-height: 18px;
   color: #4b4759;
`

const StyledInput = styled.input`
   width: 100%;
   height: 46px;
   border: 1.53px solid #d4d0d0;
   box-sizing: border-box;
   border-radius: 8px;
   outline: none;
   margin: 16px auto 30px;
   padding: 14px 20px 14px 20px;
   font-family: 'DINNextRoundedLTW01-Regular';
   font-style: normal;
   font-weight: normal;
   font-size: 16px;
   line-height: 18px;
   color: #4c4859;
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
