import React from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../../utils/constants/general'
import LogOutModalClient from '../layoutClient/LogOutModalClient'

const QuitButton = () => {
   const navigate = useNavigate()

   const [openModal, setOpenModal] = React.useState(false)
   const modalHandler = () => {
      setOpenModal((prev) => !prev)
   }

   const confirmationHandler = () => {
      modalHandler()
      navigate(ROUTES.USER)
   }

   return (
      <StyledHeader>
         <StyledMainDiv>
            <StyledNavLinkLogOut onClick={modalHandler}>
               QUIT TEST
            </StyledNavLinkLogOut>
         </StyledMainDiv>
         <LogOutModalClient
            open={openModal}
            onClose={modalHandler}
            onConfirm={confirmationHandler}
         />
      </StyledHeader>
   )
}

export default QuitButton

const StyledHeader = styled.div`
   margin: 0;
   height: 94px;
`
const StyledMainDiv = styled.div`
   margin-top: 0px;
   margin-right: auto;
   margin-left: auto;
   width: 1240px;
   height: 70px;
   display: flex;
   justify-content: flex-end;
   align-items: center;
   box-sizing: border-box;
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
