import React from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../../utils/constants/general'
import LogOutModalClient from '../../../layout/clientLayout/layoutClient/LogOutModalClient'

const Button = styled('button')`
   height: 41px;
   border: 2px solid #d4d0d0;
   box-sizing: border-box;
   border-radius: 5px;
   /* font-size: 20px; */
   font-weight: bold;
`

export const ButtonProggresTime = () => {
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
      <div>
         <Button onClick={modalHandler}>QUIT DOUGH</Button>
         <LogOutModalClient
            open={openModal}
            onClose={modalHandler}
            onConfirm={confirmationHandler}
         />
      </div>
   )
}
