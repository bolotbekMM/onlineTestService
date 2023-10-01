import React from 'react'
import styled from 'styled-components'
import Header from '../clientButton/index'
import MainContainer from '../mainContainerClient/MainContainer'

const StyledCardDiv = styled.div`
   margin-left: auto;
   margin-right: auto;
   width: 100%;
`
const StyledContentCard = styled.div`
   margin-top: 66px;
   padding: 35px 44px;
   border-radius: 10px;
   box-shadow: 0px 4px 39px rgba(196, 196, 196, 0.6);
   background-color: #ffffff;
   box-sizing: border-box;
   display: block;
`

const LayoutClient = ({ children }) => {
   return (
      <>
         <Header />
         <MainContainer>
            <StyledCardDiv>
               <StyledContentCard>{children}</StyledContentCard>
            </StyledCardDiv>
         </MainContainer>
      </>
   )
}
export default LayoutClient
