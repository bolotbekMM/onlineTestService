import React, { useState } from 'react'
import styled from 'styled-components'
import { useNavigate, useParams } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import { useDispatch, useSelector } from 'react-redux'
import Button from '../../../../components/UI/button/index'
import loading from '../../../../assets/icons/refresh.png'
import SelectRealEnglishWordModal from './SelectRealEnglishWordModal'
import { testActions } from '../../../../store'
import {
   addQuestionRequest,
   putQuestionRequest,
} from '../../../../api/testService'
import { ROUTES } from '../../../../utils/constants/general'
import WordItem from './WordItem'
import NotificationIconModal from '../../../../components/UI/modal/NotificationIconModal'

const SelectRealEnglishWord = () => {
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const params = useParams()
   const { testById } = params
   console.log(testById, 'wwww')

   const { title, duration, type, testId, optionss, questionByIdd } =
      useSelector((state) => state.questions)

   console.log(testId, 'testId')

   const [isOpenModal, setIsOpenModal] = useState(false)
   const [words, setWords] = useState([])

   const [isModal, setIsModal] = useState(false)
   const [message, setMessage] = useState('')
   const [error, setError] = useState(null)
   const [datas, setDatas] = useState('')
   const [isLoading, setIsLoading] = useState(false)

   const enabled = () => words.length > 0 && title.trim() && duration.trim()

   React.useEffect(() => {
      if (questionByIdd) {
         setWords(optionss.words)
      }
   }, [])

   const checkedHandler = (id) => {
      const optionsWithSelected = words.map((el) => {
         if (el.id === id) {
            return {
               ...el,
               correct: !el.correct,
            }
         }
         return el
      })

      setWords(optionsWithSelected)
   }

   const deleteWord = (id) => {
      const newWord = words.filter((item) => item.id !== id)
      setWords(newWord)
   }

   const openModalHandler = () => {
      setIsOpenModal((prev) => !prev)
   }

   const addOptionsHandler = (text) => {
      const { enteredValue, checkbox } = text
      setWords((prevWords) => {
         const updateWords = [...prevWords]
         updateWords.push({
            word: enteredValue,
            correct: checkbox,
            id: uuidv4(),
         })
         return updateWords
      })
   }

   const selectFormHandler = async (e) => {
      e.preventDefault()
      try {
         if (!questionByIdd) {
            setIsLoading(true)
            const data = {
               testId,
               type,
               title,
               duration,
               words,
            }

            const response = await addQuestionRequest(data)
            setDatas(response.status)
            setMessage('Question is saved')
            setIsModal(true)
            setWords([])
         }
         if (questionByIdd) {
            setIsLoading(true)
            const data = {
               testId: testById,
               type,
               title,
               duration,
               words,
            }

            const response = await putQuestionRequest(questionByIdd, data)
            setDatas(response.status)
            setMessage('Question is changed')
            setIsModal(true)
            setWords([])
         }
      } catch (error) {
         setIsModal(true)
         setMessage('Unable to save question')
         setError(error.message)
         setIsLoading(false)
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
      setIsModal((prevState) => !prevState)
   }
   const onGoBackHandler = () => {
      dispatch(testActions.resetQuestion())
      setWords([])
      if (questionByIdd) {
         navigate(`${ROUTES.ADD_TEST_PAGE}/${testById}`)
      }
      if (!questionByIdd) {
         navigate(`${ROUTES.ADD_TEST_PAGE}/${testId}`)
      }
   }

   return (
      <div>
         <NotificationIconModal
            open={isModal}
            onConfirm={onCloseModalHandler}
            error={error}
            success={datas}
            message={message}
         />
         <form onSubmit={selectFormHandler}>
            <StledButton
               onClick={openModalHandler}
               color="primary"
               variant="contained"
            >
               + ADD OPTIONS
            </StledButton>
            <SelectRealEnglishWordModal
               onAddOptions={addOptionsHandler}
               onClose={openModalHandler}
               open={isOpenModal}
            />
            <StyledContainer>
               {words.map((option, index) => {
                  return (
                     <WordItem
                        index={index + 1}
                        key={option.id}
                        words={option}
                        deleteWord={deleteWord}
                        checkedHandler={checkedHandler}
                     />
                  )
               })}
            </StyledContainer>
            <StyledDivOfModalFooter>
               <StyledBtn
                  onClick={onGoBackHandler}
                  color="primary"
                  variant="outlined"
               >
                  GO BACK
               </StyledBtn>
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
            </StyledDivOfModalFooter>
         </form>
      </div>
   )
}

export default SelectRealEnglishWord

const StyledContainer = styled.ul`
   width: 100%;
   padding: 0px;
   display: flex;
   flex-wrap: wrap;
   box-sizing: border-box;
`
const StyledDivOfModalFooter = styled.div`
   width: 100%;
   display: flex;
   justify-content: flex-end;
`
const StledButton = styled(Button)`
   margin: 32px 0 4px;
   float: right;
`
const StyledBtn = styled(Button)`
   margin-right: 16px;
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
