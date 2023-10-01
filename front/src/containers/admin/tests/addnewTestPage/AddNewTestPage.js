import React, { useState } from 'react'
import styled from 'styled-components'
import { useNavigate, useParams } from 'react-router-dom'
import ContentCard from '../../../../components/UI/adminContentCard/index'
import Input from '../../../../components/UI/input/index'
import Button from '../../../../components/UI/button/index'
import NotificationIconModal from '../../../../components/UI/modal/NotificationIconModal'
import {
   sendNewTestRequest,
   getTestByIdRequest,
   getQuestionByIdRequest,
   putTestRequest,
} from '../../../../api/testService'
import QuestionLists from './QuestionLists'
import { ROUTES } from '../../../../utils/constants/general'

const AddNewTest = () => {
   const navigate = useNavigate()
   const params = useParams()
   const paramsTest = params.testById

   const [showAddQuestionsButton, setShowAddQuestionsButton] = useState(false)
   const [newTest, setNewTest] = useState({ title: '', shortDescription: '' })
   const [isModal, setIsModal] = useState(false)
   const [message, setMessage] = useState('')
   const [error, setError] = useState(null)
   const [datas, setDatas] = useState('')
   const [questionDetails, setQuestionDetails] = React.useState([])
   const [testId, setTestId] = useState()
   const [isLoading, setIsLoading] = useState(false)

   const getTestById = async () => {
      try {
         if (paramsTest) {
            setIsLoading(true)
            getquestonsByTestId()
            const response = await getTestByIdRequest(paramsTest)
            setNewTest(response.data)
            setTestId(response.data.id)
         }
      } catch (error) {
         console.error(error)
      }
      setIsLoading(false)
   }
   const getquestonsByTestId = async () => {
      try {
         if (paramsTest) {
            setIsLoading(true)
            const questions = await getQuestionByIdRequest(paramsTest)
            setQuestionDetails(questions.data)
         }
      } catch (error) {
         console.error(error)
         setQuestionDetails(null)
      }
      setIsLoading(false)
   }

   React.useEffect(() => {
      getTestById()

      if (paramsTest) {
         setShowAddQuestionsButton(true)
      }
   }, [])

   const submitHandler = async (event) => {
      event.preventDefault()
      try {
         if (!paramsTest) {
            const response = await sendNewTestRequest(newTest)
            setDatas(response.status)
            setTestId(response.data.id)
            setMessage('Test is saved')
            setIsModal(true)
            setShowAddQuestionsButton(true)
         }
         if (paramsTest) {
            const response = await putTestRequest(paramsTest, newTest)
            setDatas(response.status)
            setMessage('Test saved')
            setIsModal(true)
         }
      } catch (error) {
         setIsModal(true)
         setMessage('Test not saved')
         setError(error.message)
      }
   }
   const onChangeHandle = (event) => {
      setNewTest((prev) => ({
         ...prev,
         [event.target.name]: event.target.value,
      }))
   }

   const onGoBackHandler = () => {
      navigate(ROUTES.ADMIN_TEST)
   }
   const addQuestionButtonHandler = () => {
      navigate(`${ROUTES.ADMIN_TEST}/${testId}/questionType`)
   }

   const onCloseModalHandler = () => {
      setIsModal((prevState) => !prevState)
   }

   const enabled =
      newTest.title.trim().length > 0 && newTest.shortDescription.trim().length

   return (
      <ContentCard>
         <NotificationIconModal
            open={isModal}
            onConfirm={onCloseModalHandler}
            error={error}
            success={datas}
            message={message}
         />
         <form onSubmit={submitHandler}>
            <StyledSpan>Title</StyledSpan>
            <StyledDivofInput>
               <Input
                  name="title"
                  value={newTest.title}
                  onChange={onChangeHandle}
               />
            </StyledDivofInput>
            <StyledSpan>Short Description</StyledSpan>
            <StyledDivofInput>
               <Input
                  name="shortDescription"
                  value={newTest.shortDescription}
                  onChange={onChangeHandle}
               />
            </StyledDivofInput>

            <StyledDivOfButtons>
               <Button
                  onClick={onGoBackHandler}
                  color="primary"
                  variant="outlined"
                  sx={{ mr: '16px' }}
               >
                  GO BACK
               </Button>
               <Button
                  disabled={!enabled}
                  type="submit"
                  color="secondary"
                  variant="contained"
               >
                  SAVE
               </Button>
               {showAddQuestionsButton && (
                  <Button
                     onClick={addQuestionButtonHandler}
                     variant="contained"
                     color="primary"
                     sx={{ ml: '16px' }}
                  >
                     + ADD MORE QUESTIONS
                  </Button>
               )}
            </StyledDivOfButtons>
         </form>
         {isLoading && <StyledP>Loading...</StyledP>}
         {!isLoading &&
            showAddQuestionsButton &&
            (questionDetails?.length > 0 ? (
               <QuestionLists
                  questionDetails={questionDetails}
                  getTestById={getTestById}
               />
            ) : (
               <StyledP>
                  Questions not found, You need to add questions.
               </StyledP>
            ))}
      </ContentCard>
   )
}

const StyledSpan = styled.p`
   margin: 0;
   font-family: 'DINNextRoundedLTW01-Regular';
   font-style: normal;
   font-weight: 600;
   font-size: 16px;
   line-height: 18px;
   color: #4b4759;
`
const StyledDivofInput = styled.div`
   margin: 6px 0px 30px;
`
const StyledDivOfButtons = styled.div`
   width: 100%;
   display: flex;
   justify-content: flex-end;
`
const StyledP = styled.p`
   text-align: center;
   font-family: 'DINNextRoundedLTW01-Regular';
   font-style: normal;
   font-weight: 500;
   color: #4c4859;
`

export default AddNewTest
