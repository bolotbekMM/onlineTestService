import React from 'react'
import styled from 'styled-components'
import { useNavigate, useParams } from 'react-router-dom'
import ContentCard from '../../../../components/UI/adminContentCard/index'
import EvaluatingSubmittedResultsTable from './EvaluatingSubmittedResultsTable'
import Button from '../../../../components/UI/button/index'
import { getUserTestAnswerRequest } from '../../../../api/testService'
import { ROUTES } from '../../../../utils/constants/general'

function EvaluatingSubmittedResultsPage() {
   const navigate = useNavigate()
   const params = useParams()
   const paramsUserID = params.userId

   const [userTest, setUserTest] = React.useState({})

   const [userAnswers, setUserAnswers] = React.useState([])

   const [userScore, setuserScore] = React.useState()
   const [userEvaluated, setuserEvaluated] = React.useState()

   const getUserTestById = async () => {
      const response = await getUserTestAnswerRequest(paramsUserID)
      setUserTest({
         user: response.data.user.fullName,
         title: response.data.mainTest.title,
      })
      setUserAnswers(response.data.userResult.questionResults)
      setuserScore(response.data.userResult.score)
      setuserEvaluated(response.data.userResult.evaluated)
   }

   React.useEffect(() => {
      getUserTestById()
   }, [])

   const sendResultsToUserHandler = () => {}

   const onGoBackHandler = () => {
      navigate(ROUTES.SUBMITED_RESULTS)
   }
   return (
      <ContentCard>
         <Wrapper>
            <Divv>
               <span>User: {userTest.user} </span>
               <span>Test: {userTest.title}</span>
            </Divv>
            <Wrapperr>
               <span>Final Score: {userScore}</span>
               <span>
                  Final Status:
                  {userEvaluated ? (
                     <TrueP>Evaluated</TrueP>
                  ) : (
                     <FalseP>Not evaluated</FalseP>
                  )}
               </span>
            </Wrapperr>
         </Wrapper>
         <Div>
            <Button
               onClick={sendResultsToUserHandler}
               color="primary"
               variant="outlined"
            >
               SEND RESULTS TO USER’S EMAIL
            </Button>
         </Div>
         <EvaluatingSubmittedResultsTable
            userAnswers={userAnswers}
            paramsUserID={paramsUserID}
         />
         <StyledDivOfModalFooter>
            <StyledBtn
               onClick={onGoBackHandler}
               color="primary"
               variant="outlined"
            >
               GO BACK
            </StyledBtn>
            <Button type="submit" color="secondary" variant="contained">
               SAVE
            </Button>
         </StyledDivOfModalFooter>
      </ContentCard>
   )
}

export default EvaluatingSubmittedResultsPage
const Wrapper = styled.div`
   display: flex;
   justify-content: space-between;
   margin-top: 50px;
`
const Wrapperr = styled.div`
   display: flex;
   flex-direction: column;
   text-align: end;
   padding: 5px;
`

const Div = styled.div`
   display: flex;
   justify-content: flex-end;
   padding: 20px 0px;
   text-align: end;
`
const Divv = styled.div`
   display: flex;
   flex-direction: column;
   padding: 5px;
   color: #4c4859;
`
const StyledDivOfModalFooter = styled.div`
   width: 100%;
   display: flex;
   justify-content: flex-end;
`

const StyledBtn = styled(Button)`
   margin-right: 16px;
`

const TrueP = styled.p`
   font-family: 'DINNextRoundedLTW01-Regular';
   font-style: normal;
   font-weight: 400;
   font-size: 16px;
   line-height: 18px;
   color: #2ab930;
`
const FalseP = styled.p`
   font-family: 'DINNextRoundedLTW01-Regular';
   font-style: normal;
   font-weight: 400;
   font-size: 16px;
   line-height: 18px;
   color: #f61414;
`
