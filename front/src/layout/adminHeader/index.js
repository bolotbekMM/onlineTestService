import React from 'react'
import styled from 'styled-components'
import { NavLink, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logout } from '../../store/auth'
import { ROUTES } from '../../utils/constants/general'
import LogOutModal from './LogOutModal'
import Logo from '../../assets/icons/logo.svg'

const Header = () => {
   const dispatch = useDispatch()
   const navigate = useNavigate()

   const [openModal, setOpenModal] = React.useState(false)
   const modalHandler = () => {
      setOpenModal((prev) => !prev)
   }

   const confirmationHandler = () => {
      modalHandler()
      dispatch(logout())
      navigate(ROUTES.LOGIN)
   }

   return (
      <StyledHeader>
         <StyledMainDiv>
            <StyledLogoDiv>
               <StyledLogo src={Logo} alt="logo" />
            </StyledLogoDiv>
            <StyledButtonDiv>
               <StyledNavLink to={ROUTES.ADMIN_TEST}>TESTS</StyledNavLink>
               <StyledNavLink to={ROUTES.SUBMITED_RESULTS}>
                  SUBMITTED RESULTS
               </StyledNavLink>
               <StyledNavLinkLogOut onClick={modalHandler}>
                  log out
               </StyledNavLinkLogOut>
            </StyledButtonDiv>
         </StyledMainDiv>
         <LogOutModal
            open={openModal}
            onClose={modalHandler}
            onConfirm={confirmationHandler}
         />
      </StyledHeader>
   )
}

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
   color: rgba(76, 72, 89, 1);
   list-style: none;
   text-decoration: none;
   text-transform: uppercase;
   line-height: 18px;
   cursor: pointer;
   &.active {
      color: #3a10e5;
   }
`

const StyledNavLinkLogOut = styled.button`
   width: 104px;
   height: 42px;
   background: none;
   display: flex;
   justify-content: center;
   align-items: center;
   border: 2px solid #4c4859;
   border-radius: 8px;
   color: rgba(76, 72, 89, 1);
   font-family: 'DINNextRoundedLTPro-Bold';
   font-size: 14px;
   text-transform: uppercase;
   text-decoration: none;
   cursor: pointer;
   box-sizing: border-box;
   &.active {
      color: #3a10e5;
      border-color: #3a10e5;
   }
`
export default Header
