import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Button from '../../../../components/UI/button/index'
import { ReactComponent as Icon } from '../../../../assets/icons/play-circle.svg'
import Input from '../../../../components/UI/input/index'
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
import Layout from '../../../../components/UI/adminContentCard'
import {
   GET_FILE_FROM_SERVER,
   ROUTES,
} from '../../../../utils/constants/general'
import { postUserQuestionScoreRequest } from '../../../../api/testService'

function TypewhatYouHearPage({ userAnswer, testTitle }) {
   const navigate = useNavigate()
   const params = useParams()

   const paramsUserID = params.UserID

   const idQuestion = params.questionID

   const gobackHandler = () => {
      navigate(`${ROUTES.EVALUATE_QUESTIONS}/${paramsUserID}`)
   }
   const playAudioHandler = () => {
      const audio = new Audio(
         `${GET_FILE_FROM_SERVER}/${userAnswer.mainQuestion?.file}`
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
            <Data>{userAnswer.user?.fullName} </Data> <br />
            <User>Test: </User>
            <Data> {testTitle} </Data>
            <ContentWrapper>
               <div style={{ paddingBottom: '33px' }}>
                  <Title>Test Question </Title>
                  <SecondaryTitle>Question Title: </SecondaryTitle>
                  <Data>{userAnswer.mainQuestion?.title}</Data>
                  <br />
                  <SecondaryTitle>Duration (in minutes):</SecondaryTitle>
                  <Data>{userAnswer.mainQuestion?.duration}</Data>
                  <br />
                  <SecondaryTitle>Question Type:</SecondaryTitle>
                  <Data>{userAnswer.mainQuestion?.type}</Data>
                  <br />
                  <SecondaryTitle>Minimum number of words:</SecondaryTitle>
                  <Data>{userAnswer.mainQuestion?.count}</Data>
               </div>
               <div>
                  <Title>Evaluation</Title>
                  <Score>Score (1 -10)</Score>
                  <Input
                     type="number"
                     min="1"
                     max="10"
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
                  PLAY AUDIO
               </Button>
               <Data>
                  Correct answer: {userAnswer.mainQuestion?.correctAnswer}
               </Data>
            </Btn>
            <div>
               <Title>User’s Answer</Title>
               <SecondaryTitle>Entered Statement: </SecondaryTitle>
               <Data>{userAnswer.userResult?.answer} </Data>
               <br />
               <SecondaryTitle>Number of plays:</SecondaryTitle>
               <Data>{userAnswer.userResult?.count}</Data>
               <br />
            </div>
            <Btnfooter>
               <Button
                  color="primary"
                  variant="outlined"
                  sx={{ mr: '16px' }}
                  onClick={gobackHandler}
               >
                  GO BACK
               </Button>
               <Button type="submit" color="secondary" variant="contained">
                  Save
               </Button>
            </Btnfooter>
         </form>
      </Layout>
   )
}

export default TypewhatYouHearPage
