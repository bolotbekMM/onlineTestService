import React from 'react'
import styled from 'styled-components'
import { deleteQuestionByIdRequest } from '../../../../api/testService'
import Items from './Items'

const QuestionLists = (props) => {
   const { questionDetails, getTestById } = props

   const onClickToDelete = async (id) => {
      await deleteQuestionByIdRequest(id)
      await getTestById()
   }

   return (
      <>
         <StyledDivTableHeader>
            <StyledDivNumber>#</StyledDivNumber>
            <StyledDivName>Name</StyledDivName>
            <StyledDivDuration>Duration</StyledDivDuration>
            <StyledDivQuestionType>Question Type</StyledDivQuestionType>
            <StyledDivIcons> </StyledDivIcons>
         </StyledDivTableHeader>

         <StyledUl>
            {questionDetails.map((details) => {
               return (
                  <StyledLiTable key={details.id}>
                     <StyledDivName>{details.title}</StyledDivName>
                     <StyledDivDuration>{details.duration}</StyledDivDuration>
                     <StyledDivQuestionType>
                        {details.type}
                     </StyledDivQuestionType>
                     <Items
                        active={details.active}
                        id={details.id}
                        onClickToDelete={onClickToDelete}
                     />
                  </StyledLiTable>
               )
            })}
         </StyledUl>
      </>
   )
}

export default QuestionLists

const StyledDivTableHeader = styled.div`
   width: 100%;
   height: 66px;
   border-top: 3px solid #d4d0d0;
   display: flex;
   justify-content: space-between;
   margin-top: 25px;
   padding: 21px 22px 21px 16px;
   box-sizing: border-box;
   font-family: 'DINNextRoundedLTW01-Regular';
   font-style: normal;
   font-weight: 600;
   font-size: 16px;
   line-height: 18px;
   display: flex;
   align-items: center;
   color: #4c4859;
`

const StyledUl = styled.ul`
   padding: 0px;
   counter-reset: my-counter;
`
const StyledLiTable = styled.li`
   width: 100%;
   height: 66px;
   box-shadow: 0px 3px 14px rgba(0, 0, 0, 0.09);
   border-radius: 8px;
   display: flex;
   justify-content: space-between;
   align-items: center;
   margin: 0px auto 16px;
   padding: 21px 22px 21px 16px;
   box-sizing: border-box;
   font-family: 'DINNextRoundedLTW01-Regular';
   font-style: normal;
   font-weight: 500;
   font-size: 16px;
   line-height: 18px;
   color: #4c4859;
   &::before {
      content: counter(my-counter);
      counter-increment: my-counter;
      width: 30px;
   }
`
const StyledDivNumber = styled.div`
   width: 30px;
`
const StyledDivName = styled.div`
   width: 290px;
`
const StyledDivDuration = styled.div`
   width: 70px;
`
const StyledDivQuestionType = styled.div`
   overflow: hidden;
   width: 230px;
`
const StyledDivIcons = styled.div`
   width: 123px;
   display: flex;
   justify-content: space-between;
`
