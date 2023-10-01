import styled from 'styled-components'
import { DialogContent, Dialog as MuiDialog } from '@mui/material'
import { ReactComponent as CloseIcon } from '../../../assets/icons/x-circle.svg'

function ModalWrapper(props) {
   const { children, fullWidth, isOpenModal, onClose, ...other } = props

   return (
      <MuiDialog
         fullWidth={fullWidth}
         open={isOpenModal}
         {...other}
         PaperProps={{
            style: {
               borderRadius: 20,
               maxWidth: 637,
               minWidth: 437,
            },
         }}
      >
         <WrapperIcon>
            <CloseIcon onClick={onClose} />
         </WrapperIcon>
         <DialogContent style={{ padding: 0 }}>{children}</DialogContent>
      </MuiDialog>
   )
}

export default ModalWrapper

const WrapperIcon = styled.div`
   display: flex;
   // padding: 23px 23px 325px 476;
   padding-top: 23px;
   padding-right: 23px;
   padding-left: 476px;
   justify-content: flex-end;
`
export const ModalFooter = styled.footer`
   background-color: #c4c4c4;
   max-width: 637px;
   min-width: 437px;
   height: 94px;
   margin-top: 40px;
   display: flex;
   justify-content: center;
   align-items: center;
`
