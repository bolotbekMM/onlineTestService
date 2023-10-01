import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import Button from '../../../../components/UI/button/index'
import Input from '../../../../components/UI/input/index'
import {
   User,
   Data,
   ContentWrapper,
   Title,
   SecondaryTitle,
   Score,
   Btnfooter,
} from '../../../../components/UI/evaluation'
import Layout from '../../../../components/UI/adminContentCard'
import { ROUTES } from '../../../../utils/constants/general'
import {
   getUserTestAnswerQuestionRequest,
   postUserQuestionScoreRequest,
} from '../../../../api/testService'

function HighlightTheAnswer({ testTitle }) {
   const navigate = useNavigate()
   const params = useParams()
   const paramsUserID = params.UserID
   const idQuestion = params.questionID

   const [userScore, setUserScore] = React.useState('')
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

   const inputCgangeHandler = (e) => {
      setUserScore({ score: e.target.value })
   }
   const submitHandler = (e) => {
      e.preventDefault()
      postUserQuestionScoreRequest(idQuestion, userScore)
      navigate(`${ROUTES.EVALUATE_QUESTIONS}/${paramsUserID}`)
   }
   const gobackHandler = () => {
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
            <br />
            <SecondaryTitleDiv>Passage: </SecondaryTitleDiv>
            <DataDiv>{userAnswer.mainQuestion?.passage}</DataDiv>
            <br />
            <SecondaryTitle>Question Statement:</SecondaryTitle>
            <Data>{userAnswer.mainQuestion?.statement}</Data>
            <br />
            <SecondaryTitle>Correct answer: </SecondaryTitle>
            <Data>{userAnswer.mainQuestion?.correctAnswer}</Data>
            <br />
            <Title>User’s Answer</Title>
            <SecondaryTitleDiv>Respond: </SecondaryTitleDiv>
            <DataDiv>{userAnswer.userResult?.answer}</DataDiv>
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

export default HighlightTheAnswer

const SecondaryTitleDiv = styled.p`
   width: 65px;
   font-weight: 600;
   vertical-align: top;
   margin: 10px 10px 0px 0px;
   color: #4c4859;
   display: inline-block;
   font-family: 'DINNextRoundedLTW01-Regular';
`

const DataDiv = styled.div`
   width: 830px;
   display: inline-block;
   text-align: justify;
   margin-top: 10px;
   margin-left: 5px;
   font-weight: 500;
   font-size: 16px;
   font-family: 'DINNextRoundedLTW01-Regular';
`
