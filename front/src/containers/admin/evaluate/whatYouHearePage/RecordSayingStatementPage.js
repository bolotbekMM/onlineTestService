import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import Layout from '../../../../components/UI/adminContentCard'
import Button from '../../../../components/UI/button/index'
import { ReactComponent as Icon } from '../../../../assets/icons/play-circle.svg'
import {
   User,
   Data,
   ContentWrapper,
   Title,
   SecondaryTitle,
   Score,
   Btn,
   IconWrapper,
   Btnfooter,
} from '../../../../components/UI/evaluation'
import Input from '../../../../components/UI/input/index'
import {
   GET_FILE_FROM_SERVER,
   ROUTES,
} from '../../../../utils/constants/general'
import {
   getUserTestAnswerQuestionRequest,
   postUserQuestionScoreRequest,
} from '../../../../api/testService'

function RecordSayingStatementPage({ testTitle }) {
   const navigate = useNavigate()
   const params = useParams()

   const paramsUserID = params.UserID

   const idQuestion = params.questionID

   const gobackHandler = () => {
      navigate(`${ROUTES.EVALUATE_QUESTIONS}/${paramsUserID}`)
   }

   const [userAnswer, setuserAnswer] = React.useState({})

   const getQuestionById = async () => {
      try {
         const response = await getUserTestAnswerQuestionRequest(idQuestion)
         setuserAnswer(response.data)
      } catch (error) {
         console.error(error)
      }
   }

   React.useEffect(() => {
      getQuestionById()
   }, [])

   const playAudioHandler = () => {
      const audio = new Audio(
         `${GET_FILE_FROM_SERVER}/${userAnswer.userResult?.file}`
      )
      audio.play()
   }
   const [userScore, setUserScore] = React.useState('')

   const inputCgangeHandler = (e) => {
      setUserScore({ score: e.target.value })
   }
   const submitHandler = (e) => {
      e.preventDefault()
      postUserQuestionScoreRequest(idQuestion, userScore)
      navigate(`${ROUTES.EVALUATE_QUESTIONS}/${paramsUserID}`)
   }
   return (
      <Layout>
         <form onSubmit={submitHandler}>
            <User>User:</User>
            <Data>{userAnswer.user?.fullName}</Data>
            <br />
            <User>Test:</User>
            <Data>{testTitle}</Data>
            <ContentWrapper>
               <Div>
                  <Title>Test Question</Title>
                  <SecondaryTitle>Question Title:</SecondaryTitle>
                  <Data>{userAnswer.mainQuestion?.title}</Data>
                  <br />
                  <SecondaryTitle>Duration (in minutes):</SecondaryTitle>
                  <Data>{userAnswer.mainQuestion?.duration}</Data>
                  <br />
                  <SecondaryTitle>Question Type:</SecondaryTitle>
                  <Data>{userAnswer.mainQuestion?.type}</Data>
                  <br />
                  <SecondaryTitle>Statement:</SecondaryTitle>
                  <Data>{userAnswer.mainQuestion?.statement}</Data>
               </Div>
               <div>
                  <Title>Evaluation</Title>
                  <Score>Score (1 -10)</Score>
                  <Input
                     type="number"
                     onChange={inputCgangeHandler}
                     inputProps={{
                        style: {
                           height: '13px',
                           width: '66px',
                        },
                     }}
                  />
               </div>
            </ContentWrapper>
            <Btn>
               <Button
                  onClick={playAudioHandler}
                  variant="outlined"
                  sx={{ mr: '18px' }}
               >
                  <IconWrapper>
                     <Icon />
                  </IconWrapper>
                  PLAY RECORD AUDIO
               </Button>
            </Btn>
            <Btnfooter>
               <Button
                  color="primary"
                  variant="outlined"
                  sx={{ mr: '16px' }}
                  onClick={gobackHandler}
               >
                  Go BACK
               </Button>
               <Button type="submit" color="secondary" variant="contained">
                  Save
               </Button>
            </Btnfooter>
         </form>
      </Layout>
   )
}
export default RecordSayingStatementPage
const Div = styled.div`
   padding-bottom: 33px;
`
