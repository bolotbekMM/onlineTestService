import React from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import LayoutClient from '../../../layout/clientLayout/layoutClient/LayoutClient'
import { ReactComponent as Try } from '../../../assets/icons/img-try.svg'
import { ReactComponent as IconOnline } from '../../../assets/icons/icon_online.svg'
import { ReactComponent as IconTime } from '../../../assets/icons/icon_time.svg'
import { ReactComponent as IcPhoto } from '../../../assets/icons/ic-photo.svg'
import Button from '../../../components/UI/button/index'
import { ROUTES } from '../../../utils/constants/general'
import { submitQuestion } from '../../../store/testActions'

function StartPracticeTest() {
   const navigate = useNavigate()
   const dispatch = useDispatch()

   const { testById } = useParams()

   const cancelHandler = () => {
      navigate(ROUTES.HOME_PAGE)
   }

   const practiceTestHandler = () => {
      dispatch(submitQuestion(testById))
      navigate(`${ROUTES.START_PRACTICE_TEST}/${testById}/checking-your-device`)
   }

   return (
      <LayoutClient>
         <HeaderTitle>
            Take a free practice test and estimate your score
         </HeaderTitle>
         <Main>
            <Try />
            <DivIcons>
               <IconDiv>
                  <IconOnline /> <P>See what the test is like *</P>
               </IconDiv>
               <IconDiv>
                  <IconTime /> <P>Practice takes just 15 minutes</P>
               </IconDiv>
               <IconDiv>
                  <IcPhoto /> <P>Get an unofficial score estimate</P>
               </IconDiv>
            </DivIcons>
         </Main>
         <Text>
            * The practice test may include question types that may not appear
            on the certified test.
         </Text>
         <Div>
            <Button
               onClick={cancelHandler}
               color="primary"
               variant="outlined"
               sx={{ width: '148px' }}
            >
               CANCEL
            </Button>
            <Button
               onClick={practiceTestHandler}
               color="primary"
               variant="contained"
            >
               PRACTICE TEST
            </Button>
         </Div>
      </LayoutClient>
   )
}

export default StartPracticeTest

const HeaderTitle = styled.p`
   font-family: 'DINNextRoundedLTW01';
   font-size: 28px;
   color: #4c4859;
   display: flex;
   justify-content: center;
`
const Main = styled.div`
   margin: 0 auto;
   width: 550px;
   margin-top: 60px;
   margin-bottom: 92px;
   display: flex;
   justify-content: space-between;
   align-items: center;
`
const Text = styled.p`
   font-family: 'DINNextRoundedLTW01-Regular';
   font-size: 16px;
   color: #4c4859;
   display: flex;
   justify-content: center;
`
const Div = styled.div`
   border-top: 2px solid #d4d0d0;
   padding-top: 32px;
   display: flex;
   justify-content: space-between;
`

const IconDiv = styled.div`
   height: 27px;
   margin-bottom: 17px;
   display: flex;
   align-items: center;
`
const P = styled.p`
   font-family: 'DINNextRoundedLTW01-Regular';
   font-size: 18px;
   color: #4c4859;
   margin-left: 20px;
`

const DivIcons = styled.div`
   display: flex;
   flex-direction: column;
`
