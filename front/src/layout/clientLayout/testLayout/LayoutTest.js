import React from 'react'
import styled from 'styled-components'
import MainContainer from '../mainContainerClient/MainContainer'
import QuitButton from './QuitButton'

const StyledCardDiv = styled.div`
   margin-left: auto;
   margin-right: auto;
   width: 100%;
`
const StyledContentCard = styled.div`
   padding: 35px 44px;
   border-radius: 10px;
   box-shadow: 0px 4px 39px rgba(196, 196, 196, 0.6);
   background-color: #ffffff;
   box-sizing: border-box;
   display: block;
`

const LayoutTest = ({ children }) => {
   return (
      <>
         <QuitButton />
         <MainContainer>
            <StyledCardDiv>
               <StyledContentCard>{children}</StyledContentCard>
            </StyledCardDiv>
         </MainContainer>
      </>
   )
}
export default LayoutTest
