import React from 'react'
import styled from 'styled-components'
import Logo from '../../assets/icons/logo.svg'

const StyledFooterDiv = styled.div`
   bottom: 0;
   width: 100%;
   height: 95px;
   background-color: white;
   box-sizing: border-box;
   margin-bottom: 0px;
   margin-top: 60px;
`
const StyledDiv = styled.div`
   width: 1140px;
   margin-left: auto;
   margin-right: auto;
`
const StyledMainDiv = styled.div`
   width: 100%;
   height: 95px;
   display: flex;
   justify-content: center;
   align-items: center;
   box-sizing: border-box;
`
const StyledLogo = styled.img`
   margin-right: 6px;
   width: 135px;
   height: 54px;
`

const StyledCopyright = styled.span`
   font-family: 'Inter';
   font-style: normal;
   font-weight: normal;
   padding-top: 3px;
   font-size: 15px;
   margin-left: 6px;
   color: #98a2b3;
`

const Footer = () => {
   return (
      <StyledFooterDiv>
         <StyledDiv>
            <StyledMainDiv>
               <StyledLogo src={Logo} alt="Logo" />
               <StyledCopyright>© 2022 Peaksoft</StyledCopyright>
            </StyledMainDiv>
         </StyledDiv>
      </StyledFooterDiv>
   )
}

export default Footer
