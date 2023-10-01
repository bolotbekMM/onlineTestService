import React from 'react'
import styled from 'styled-components'
import { useNavigate, useParams } from 'react-router-dom'
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
import {
   GET_FILE_FROM_SERVER,
   ROUTES,
} from '../../../../utils/constants/general'
import { postUserQuestionScoreRequest } from '../../../../api/testService'

function DescribeImagePage({ userAnswer, testTitle }) {
   const navigate = useNavigate()
   const params = useParams()

   const paramsUserID = params.UserID

   const idQuestion = params.questionID

   const gobackHandler = () => {
      navigate(`${ROUTES.EVALUATE_QUESTIONS}/${paramsUserID}`)
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
            <Data>{userAnswer.user?.fullName}</Data> <br />
            <User>Test: </User>
            <Data>{testTitle}</Data>
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
                     onChange={inputCgangeHandler}
                     type="number"
                     inputProps={{
                        style: {
                           height: '13px',
                           width: '66px',
                        },
                     }}
                  />
               </div>
            </ContentWrapper>
            <ImgWrapper>
               <StyledImg
                  src={`${GET_FILE_FROM_SERVER}/${userAnswer.mainQuestion?.file}`}
                  alt="imgFromServer"
               />
               {/* <Photo style={{ marginRight: '31px' }} /> */}
               <ThirdlyTitle>
                  Correct answer:
                  <Data>{userAnswer.mainQuestion?.correctAnswer}</Data>
               </ThirdlyTitle>
            </ImgWrapper>
            <div>
               <Title>User’s Answer </Title>
               <Data>{userAnswer.userResult?.answer}</Data>
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
export default DescribeImagePage
const ImgWrapper = styled.div`
   border-radius: 5px;
   display: flex;
   align-items: center;
   margin: 43px 0px 43px 0px;
   color: #4c4859;
   font-weight: 500;
   font-family: 'DINNextRoundedLTW01-Regular';
`
const StyledImg = styled.img`
   width: 182px;
   height: 178px;
   border-radius: 5px;
`

const ThirdlyTitle = styled.h4`
   font-weight: 600;
   margin-left: 40px;
   color: #4c4859;
   display: inline-block;
   font-family: 'DINNextRoundedLTW01-Regular';
`
