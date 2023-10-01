import React from 'react'
import styled from 'styled-components'
import { NavLink, Outlet } from 'react-router-dom'
import Logo from '../../assets/icons/logo.svg'

const StyledHeader = styled.div`
   margin: 0;
   height: 94px;
   background-color: white;
`
const StyledMainDiv = styled.div`
   margin-top: 0px;
   margin-right: auto;
   margin-left: auto;
   width: 1140px;
   height: 94px;
   display: flex;
   justify-content: space-between;
   align-items: center;
   box-sizing: border-box;
`
const StyledLogoDiv = styled.div`
   width: 187px;
   height: 100%;
   display: flex;
   justify-content: center;
   align-items: center;
   box-sizing: border-box;
`
const StyledButtonDiv = styled.div`
   width: 431px;
   height: 100%;
   display: flex;
   justify-content: space-between;
   align-items: center;
   box-sizing: border-box;
`
const StyledLogo = styled.img`
   width: 174px;
   height: 42px;
`
const StyledNavLink = styled(NavLink)`
   font-family: 'DINNextRoundedLTPro-bold';
   font-weight: bold;
   font-size: 14px;
   list-style: none;
   text-decoration: none;
   text-transform: uppercase;
   line-height: 18px;
   cursor: pointer;
   &.active {
      color: var(--color-active);
      cursor: default;
   }
`
const StyledLogOutButton = styled.button`
   width: 104px;
   height: 42px;
   background: none;
   display: flex;
   justify-content: center;
   align-items: center;
   border: 2px solid #4c4859;
   border-radius: 8px;
   color: rgba(76, 72, 89, 1);
   font-family: DINNextRoundedLTPro-Bold;
   font-size: 14px;
   text-transform: uppercase;
   cursor: pointer;
   box-sizing: border-box;
   :hover {
      color: #3a10e5;
      border-color: #3a10e5;
   }
`
const StyledUl = styled.ul`
   width: 257px;
   padding: 0px;
   display: flex;
   justify-content: space-between;
`
const Header = (onClick) => {
   return (
      <>
         <StyledHeader>
            <StyledMainDiv>
               <StyledLogoDiv>
                  <StyledLogo src={Logo} alt="logo" />
               </StyledLogoDiv>
               <StyledButtonDiv>
                  <nav>
                     <StyledUl>
                        <StyledNavLink to="test">test</StyledNavLink>
                        <StyledNavLink to="submitResults">
                           submitted results
                        </StyledNavLink>
                     </StyledUl>
                  </nav>
                  <StyledLogOutButton onClick={onClick}>
                     log out
                  </StyledLogOutButton>
               </StyledButtonDiv>
            </StyledMainDiv>
         </StyledHeader>
         <Outlet />
      </>
   )
}
export default Header
