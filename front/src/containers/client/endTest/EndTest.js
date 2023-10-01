import React from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import Button from '../../../components/UI/button/index'
import checkMark from '../../../assets/icons/checkMark.svg'
import book from '../../../assets/icons/book.svg'
import Line from '../../../assets/icons/Line.svg'
import ClientLayoutEnd from '../../../layout/clientLayout/clientLayoutEnd/ClientLayoutEnd'
import { ROUTES } from '../../../utils/constants/general'

const DivImg = styled('div')`
   display: flex;
   justify-content: center;
   p {
      font-weight: 400;
      font-size: 28px;
      line-height: 32px;
      color: #4c4859;
      margin-right: 26px;
   }
`

const Div = styled('div')`
   display: flex;
   justify-content: center;
   margin-top: 56px;
`

const DivP = styled('div')`
   display: flex;
   align-items: center;
   flex-direction: column;
   margin-top: 46px;
   div {
      font-weight: 400;
      font-size: 18px;
      line-height: 124%;
      color: #4c4859;
   }
`

const DivLine = styled('div')`
   display: flex;
   justify-content: center;
   margin-top: 56px;
   img {
      width: 668px;
   }
`

const DivButton = styled('div')`
   display: flex;
   justify-content: space-between;
   margin-top: 32px;
`
const Button2 = styled(Button)`
   width: 148px;
`

const EndTest = () => {
   const navigate = useNavigate()

   const onClicktoHomePage = () => {
      navigate(ROUTES.HOME_PAGE)
   }

   const onClickToPracticeTest = () => {
      navigate(ROUTES.START_PRACTICE_TEST_TEST_BY_ID)
   }

   return (
      <ClientLayoutEnd>
         <DivImg>
            <p>Practice test complete!</p>
            <img src={checkMark} alt="checkMark" />
         </DivImg>
         <Div>
            <img src={book} alt="book" />
         </Div>
         <DivP>
            <div>Your results were sent for evaluation process.</div>
            <div>After evaluation your results will be sent to your email.</div>
         </DivP>
         <DivLine>
            <img src={Line} alt="Line" />
         </DivLine>
         <DivButton>
            <Button onClick={onClickToPracticeTest}>PRACTICE TEST</Button>
            <Button2
               onClick={onClicktoHomePage}
               variant="contained"
               size="medium"
            >
               DONE
            </Button2>
         </DivButton>
      </ClientLayoutEnd>
   )
}

export default EndTest
