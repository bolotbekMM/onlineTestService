import styled from 'styled-components'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import Input from '../../../../components/UI/input'
import {
   addQuestionRequest,
   postFileRequest,
   putQuestionRequest,
} from '../../../../api/testService'
import Button from '../../../../components/UI/button/index'
import loading from '../../../../assets/icons/refresh.png'
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

const DivImage = styled('div')`
   width: 300px;
   display: flex;
   align-items: center;
   justify-content: space-between;
   margin-top: 30px;
`

const InputImage = styled(Input)`
   display: none;
`
const ButtonImage = styled(Button)`
   width: 182px;
   height: 178px;
   background-color: none;
   color: #4c4859;
   border: 1px solid #d4d0d0;
`

const InputFooter = styled(Input)`
   width: 900px;
   height: 70px;
`

const DivFooter = styled('div')`
   display: flex;
   width: 250px;
   justify-content: flex-end;
   justify-content: space-around;
   position: relative;
   left: 670px;
   top: 32px;
`

const ImageUpload = styled('img')`
   width: 182px;
   height: 178px;
   border-radius: 5%;
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

const DescribeImage = () => {
   const dispatch = useDispatch()

   const navigate = useNavigate()
   const params = useParams()
   const { testById, testId: testId2 } = params

   const { title, duration, type, testId, optionss, questionByIdd } =
      useSelector((state) => state.questions)

   const [image, setImage] = useState({})
   const [correctAnswer, setcCorrectAnswer] = useState('')
   const [datas, setDatas] = useState('')
   const [message, setMessage] = useState('')
   const [isModal, setIsModal] = useState(false)
   const [error, setError] = useState(null)
   const [isLoading, setIsLoading] = useState(false)

   const transformedType = type.replace(/[\s.,%]/g, '')

   const correctAnswerChangeHandler = (e) => {
      setcCorrectAnswer(e.target.value)
   }

   React.useEffect(() => {
      if (questionByIdd) {
         setcCorrectAnswer(optionss.correctAnswer)
         setImage({
            preview: `${GET_FILE_FROM_SERVER}/${optionss.file}`,
         })
      }
   }, [])

   function sendFileToApi() {
      if (image.file) {
         const formData = new FormData()
         formData.append('file', image.file)
         const response = postFileRequest(formData)
         return response
      }
      return optionss.file
   }

   const onChangeHandler = (e) => {
      if (!e.target.files[0]) return
      setImage({
         file: e.target.files[0],
         preview: URL.createObjectURL(e.target.files[0]),
      })
   }

   const enabled = () => {
      return (
         image.preview &&
         title.trim() &&
         duration.trim() &&
         correctAnswer.trim()
      )
   }

   const clearStateDescribeImageState = () => {
      setcCorrectAnswer('')
      setImage({})
   }

   const sumbitDescribeImageHandler = async (e) => {
      e.preventDefault()
      if (correctAnswer.trim() === 0 && title.trim() && duration.trim()) {
         return
      }
      try {
         if (!questionByIdd) {
            setIsLoading(true)
            const responseImage = await sendFileToApi()
            const describeImageData = {
               testId: testId ?? testId2,
               type: transformedType,
               title,
               duration,
               file: responseImage.data.id,
               correctAnswer,
            }
            const responseResult = await addQuestionRequest(describeImageData)
            setDatas(responseResult.status)
         }
         if (questionByIdd) {
            setIsLoading(true)
            const responseImage = await sendFileToApi()
            const describeImageData = {
               testId: testById,
               type: transformedType,
               title,
               duration,
               file: responseImage.data ? responseImage.data : responseImage,
               correctAnswer,
            }
            const responseResult = await putQuestionRequest(
               questionByIdd,
               describeImageData
            )
            setDatas(responseResult.status)
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
   const onCloseModalHandler = () => {
      if (questionByIdd) {
         navigate(`${ROUTES.ADD_TEST_PAGE}/${testById}`)
      }
      if (!questionByIdd) {
         navigate(`${ROUTES.ADD_TEST_PAGE}/${testId}`)
      }
      dispatch(testActions.resetQuestion())
      clearStateDescribeImageState()
      setIsModal((prevState) => !prevState)
   }
   const onGoBackHandler = () => {
      dispatch(testActions.resetQuestion())
      clearStateDescribeImageState()
      if (questionByIdd) {
         navigate(`${ROUTES.ADD_TEST_PAGE}/${testById}`)
      }
      if (!questionByIdd) {
         navigate(`${ROUTES.ADD_TEST_PAGE}/${testId}`)
      }
   }

   return (
      <form onSubmit={sumbitDescribeImageHandler}>
         <NotificationIconModal
            open={isModal}
            onConfirm={onCloseModalHandler}
            error={error}
            success={datas}
            message={message}
         />
         <DivImage>
            <label htmlFor="contained-button-file">
               <InputImage
                  inputProps={{
                     accept: 'image/*',
                  }}
                  id="contained-button-file"
                  multiple
                  type="file"
                  onChange={onChangeHandler}
               />
               <ButtonImage
                  variant="outlined"
                  color="secondary"
                  component="span"
               >
                  {image.preview ? (
                     <ImageUpload src={image.preview} />
                  ) : (
                     <p>Uppload image </p>
                  )}
               </ButtonImage>
            </label>
         </DivImage>
         <StyledP>Correct answer</StyledP>
         <InputFooter
            onChange={correctAnswerChangeHandler}
            multiline
            value={correctAnswer}
            name="correctAnswer"
         />
         <DivFooter>
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
         </DivFooter>
      </form>
   )
}

export default DescribeImage
