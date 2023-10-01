import React, { useState } from 'react'
import styled from 'styled-components'
import Input from '../../../../components/UI/input'
import ReCheckbox from '../../../../components/UI/checkbox/index'
import Button from '../../../../components/UI/button/index'
import ModalWrapper, {
   ModalFooter,
} from '../../../../components/UI/modal/ModalWrapper'

const SelectTheMainIdeaModal = ({ onClose, open, onAddOptions }) => {
   const [enteredValue, setEnteredValue] = useState('')
   const [isChecked, setIsChecked] = useState(false)

   const goalInputChangeHandler = (event) => {
      setEnteredValue(event.target.value)
   }
   const enabled = enteredValue.length > 0

   const formSubmitHandler = (event) => {
      event.preventDefault()
      event.stopPropagation()
      const ansewer = {
         enteredValue,
         isChecked,
      }
      onAddOptions(ansewer)
      setIsChecked(false)
      setEnteredValue('')
      onClose()
   }

   return (
      <ModalWrapper onClose={onClose} open={open}>
         <form onSubmit={formSubmitHandler}>
            <DivTitle>
               <StyledP>Title</StyledP>
            </DivTitle>

            <InputenteredValue
               multiline
               value={enteredValue}
               onChange={goalInputChangeHandler}
            />

            <div>
               <StyledSpanInModal>Is true option?</StyledSpanInModal>
               <ReCheckbox
                  onClick={() => {
                     setIsChecked((isChecked) => !isChecked)
                  }}
               />
            </div>
            <ModalFooter>
               <StyledDivOfFooter>
                  <ButtonGoBack
                     onClick={onClose}
                     color="primary"
                     variant="outlined"
                  >
                     GO BACK
                  </ButtonGoBack>
                  <Button
                     type="sumbit"
                     color="secondary"
                     variant="contained"
                     disabled={!enabled}
                  >
                     SAVE
                  </Button>
               </StyledDivOfFooter>
            </ModalFooter>
         </form>
      </ModalWrapper>
   )
}

export default SelectTheMainIdeaModal

const DivTitle = styled('div')`
   margin: 42px 60px 16px;
`

const InputenteredValue = styled(Input)`
   width: 517px;
   margin: 16px 60px 34px 60px;
`

const StyledSpanInModal = styled('span')`
   font-family: 'DINNextRoundedLTW01-Regular';
   font-style: normal;
   font-weight: normal;
   font-size: 16px;
   line-height: 18px;
   color: #4c4859;
   margin-left: 60px;
`

const StyledDivOfFooter = styled('div')`
   width: 100%;
   margin-right: 60px;
   display: flex;
   justify-content: flex-end;
`

const StyledP = styled('p')`
   padding: 0;
   font-family: 'DINNextRoundedLTW01-Regular';
   font-style: normal;
   font-weight: 600;
   font-size: 16px;
   line-height: 18px;
   color: #4b4759;
`

const ButtonGoBack = styled(Button)`
   margin-right: 16px;
   background: white;
`
