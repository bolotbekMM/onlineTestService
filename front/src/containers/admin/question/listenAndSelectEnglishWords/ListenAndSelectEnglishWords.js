/* eslint-disable no-await-in-loop */
import React, { useState } from 'react'
import styled from 'styled-components'
import { useNavigate, useParams } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import { useDispatch, useSelector } from 'react-redux'
import Button from '../../../../components/UI/button/index'
import loading from '../../../../assets/icons/refresh.png'
import { testActions } from '../../../../store'
import {
   addQuestionRequest,
   postFileRequest,
   putQuestionRequest,
} from '../../../../api/testService'
import ListenItem from './ListenItem'
import ListenAndSelectEnglishWordsModal from './ListenAndSelectEnglishWordModal'
import NotificationIconModal from '../../../../components/UI/modal/NotificationIconModal'
import { ROUTES } from '../../../../utils/constants/general'

const ListenAndSelectEnglishWords = () => {
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const params = useParams()
   const { testById } = params

   const { title, duration, type, testId, optionss, questionByIdd } =
      useSelector((state) => state.questions)

   const [options, setOptions] = useState([])
   const [isOpenModal, setIsOpenModal] = React.useState(false)
   const [isModal, setIsModal] = useState(false)
   const [message, setMessage] = useState('')
   const [error, setError] = useState(null)
   const [datas, setDatas] = useState('')
   const [isLoading, setIsLoading] = useState(false)

   const enabled = () => options.length > 0 && title.trim() && duration.trim()

   const transformedType = type.replace(/[\s.,%]/g, '')

   React.useEffect(() => {
      if (questionByIdd) {
         setOptions(optionss.options)
      }
   }, [])

   const checkedHandler = (id) => {
      const optionsWithSelected = options.map((el) => {
         if (el.id === id) {
            return {
               ...el,
               correct: !el.correct,
            }
         }
         return el
      })

      setOptions(optionsWithSelected)
   }
   const deleteWord = (id) => {
      const newWord = options.filter((item) => item.id !== id)
      setOptions(newWord)
   }

   const openModalHandler = () => {
      setIsOpenModal((prev) => !prev)
   }

   const uploadFile = async (file) => {
      try {
         const formData = new FormData()
         formData.append('file', file)
         const { data } = await postFileRequest(formData)
         return data.id
      } catch (error) {
         return null
      }
   }

   const sendFilesToApi = async () => {
      let copyOfOptions = [...options]

      const newOptions = options.filter((item) =>
         // eslint-disable-next-line no-prototype-builtins
         item.hasOwnProperty('fileName')
      )

      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < newOptions.length; i++) {
         const currentOption = newOptions[i] //

         const audio = currentOption.fileName.file
         const fileNameCameFrombackend = await uploadFile(audio)

         if (fileNameCameFrombackend) {
            copyOfOptions = copyOfOptions.map((item) => {
               if (item.id === currentOption.id) {
                  return {
                     ...item,
                     file: fileNameCameFrombackend,
                  }
               }

               return item
            })
         }
      }
      return copyOfOptions
   }

   const addOptionsHandler = (optionData) => {
      const { enteredValue, checkbox, audio } = optionData

      setOptions((prevWords) => {
         const updateWords = [...prevWords]
         updateWords.push({
            word: enteredValue,
            correct: checkbox,
            fileName: audio,
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
            const updatedOptions = await sendFilesToApi()
            const data = {
               testId,
               type: transformedType,
               title,
               duration,
               options: updatedOptions,
            }

            const response = await addQuestionRequest(data)
            setDatas(response.status)
            setMessage('Question is saved')
            setIsModal(true)
            setOptions([])
         }
         if (questionByIdd) {
            setIsLoading(true)
            const updatedOptions = await sendFilesToApi()
            const data = {
               testId: +testById,
               type: transformedType,
               title,
               duration,
               options: updatedOptions,
            }
            const response = await putQuestionRequest(questionByIdd, data)
            setDatas(response.status)
            setMessage('Question is saved')
            setIsModal(true)
            setOptions([])
         }
      } catch (error) {
         setIsLoading(false)
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
      setIsModal((prevState) => !prevState)
   }

   const onGoBackHandler = () => {
      dispatch(testActions.resetQuestion())
      setOptions([])
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
            <ListenAndSelectEnglishWordsModal
               onAddOptions={addOptionsHandler}
               onClose={openModalHandler}
               open={isOpenModal}
            />
            <StyledContainer>
               {options.map((option) => {
                  return (
                     <ListenItem
                        key={option.id}
                        option={option}
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

export default ListenAndSelectEnglishWords

const StyledContainer = styled.ul`
   width: 100%;
   padding: 0px;
   display: flex;
   flex-wrap: wrap;
   box-sizing: border-box;
   counter-reset: my-counter;
`
const StyledDivOfModalFooter = styled.div`
   width: 100%;
   display: flex;
   justify-content: flex-end;
`
const StyledBtn = styled(Button)`
   margin-right: 16px;
`
const StledButton = styled(Button)`
   margin: 32px 0 4px;
   float: right;
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
