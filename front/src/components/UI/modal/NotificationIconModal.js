import React from 'react'
import Button from '../button/index'
import { ReactComponent as SuccessIcon } from '../../../assets/icons/success.svg'
import { BoldText, Text, WrapperContent } from './ConfirmModal'
import { ReactComponent as ErrorIcon } from '../../../assets/icons/delete.svg'
import ModalWrapper, { ModalFooter } from './ModalWrapper'

function NotificationIconModal({ success, error, onConfirm, open, message }) {
   let content
   if (success)
      content = (
         <>
            <SuccessIcon />
            <BoldText>{message}</BoldText>
            <Text>Success</Text>
         </>
      )

   if (error)
      content = (
         <>
            <ErrorIcon />
            <BoldText>{message}</BoldText>
            <Text>Error</Text>
         </>
      )
   return (
      <ModalWrapper onClose={onConfirm} open={open} role="presentation">
         <WrapperContent>{content}</WrapperContent>
         <ModalFooter>
            <Button variant="contained" color="primary" onClick={onConfirm}>
               OK
            </Button>
         </ModalFooter>
      </ModalWrapper>
   )
}

export default NotificationIconModal
