import styled from 'styled-components'
import { ReactComponent as ConfirmIcon } from '../../../assets/icons/Confirm.svg'
import Button from '../button/index'
import ModalWrapper, { ModalFooter } from './ModalWrapper'

function ConfirmModal({ open, onClose, onDelete }) {
   return (
      <ModalWrapper open={open} onClose={onClose}>
         <WrapperContent>
            <ConfirmIcon />
            <BoldText>Do you want delete?</BoldText>
            <Text>You can’t restore this file </Text>
         </WrapperContent>
         <ModalFooter>
            <Cansel>
               <Button onClick={onClose} variant="outlined" color="primary">
                  cancel
               </Button>
            </Cansel>
            <Delete>
               <Button onClick={onDelete} variant="contained" color="primary">
                  delete
               </Button>
            </Delete>
         </ModalFooter>
      </ModalWrapper>
   )
}

export default ConfirmModal
export const WrapperContent = styled.div`
   display: flex;
   justify-content: start;
   flex-direction: column;
   align-items: center;
   padding: 61px;
`
export const BoldText = styled.div`
   font-family: 'DINNextRoundedLTPro-Bold';
   font-size: 20px;
   margin-top: 50px;
`
export const Text = styled.div`
   font-size: 16px;
   color: #4c4859;
   padding: 7px;
`
const Cansel = styled.div`
   margin-left: 120px;
   margin-right: 20px;
`

const Delete = styled.div`
   margin-right: 120px;
   margin-left: 20px;
`
