import React, { useState } from 'react'
import styled from 'styled-components'
import ReCheckbox from '../../../../components/UI/checkbox/index'
import Button from '../../../../components/UI/button/index'
import ModalWrapper, {
   ModalFooter,
} from '../../../../components/UI/modal/ModalWrapper'
import Input from '../../../../components/UI/input'

const ListenAndSelectEnglishWordsModal = ({ onClose, open, onAddOptions }) => {
   const [enteredValue, setEnteredValue] = useState('')
   const [checkbox, setCheckBox] = useState(false)
   const [audio, setAudio] = useState(null)
   const goalInputChangeHandler = (event) => {
      setEnteredValue(event.target.value)
   }

   const isFormValid = () => {
      return enteredValue.length && audio
   }

   const formSubmitHandler = (event) => {
      event.preventDefault()
      event.stopPropagation()
      const answer = {
         enteredValue,
         checkbox,
         audio,
      }
      onAddOptions(answer)
      setCheckBox(false)
      setEnteredValue('')
      onClose()
      clearState()
   }
   const audioHandler = (e) => {
      if (e.target.files[0]) {
         setAudio({
            file: e.target.files[0],
            play: new Audio(URL.createObjectURL(e.target.files[0])),
         })
      }
   }

   const clearState = () => {
      setAudio(null)
   }

   return (
      <ModalWrapper onClose={onClose} open={open}>
         <form onSubmit={formSubmitHandler}>
            <Div>
               <StyledSpan>Title</StyledSpan>
            </Div>

            <InputStyled
               value={enteredValue}
               onChange={goalInputChangeHandler}
            />
            <Style>
               <label htmlFor="contained-button-file">
                  <InputUpload
                     id="contained-button-file"
                     multiple
                     type="file"
                     inputProps={{
                        accept: 'audio/*',
                     }}
                     onChange={audioHandler}
                  />
                  <Button component="span">Uppload audio file</Button>
               </label>
               <Span>{(audio && audio.file.name) || ''}</Span>
            </Style>
            <div>
               <StyledSpanInModal>Is true option?</StyledSpanInModal>
               <ReCheckbox
                  onClick={() => {
                     setCheckBox((checkbox) => !checkbox)
                  }}
               />
            </div>
            <ModalFooter>
               <StyledDivOfModalFooter>
                  <StyledBtn
                     color="primary"
                     variant="outlined"
                     onClick={onClose}
                  >
                     GO BACK
                  </StyledBtn>
                  <Button
                     type="submit"
                     color="secondary"
                     variant="contained"
                     disabled={!isFormValid()}
                  >
                     SAVE
                  </Button>
               </StyledDivOfModalFooter>
            </ModalFooter>
         </form>
      </ModalWrapper>
   )
}

export default ListenAndSelectEnglishWordsModal
const StyledSpanInModal = styled.span`
   font-family: 'DINNextRoundedLTW01-Regular';
   font-style: normal;
   font-weight: normal;
   font-size: 16px;
   line-height: 18px;
   color: #4c4859;
   margin-left: 60px;
`
const StyledDivOfModalFooter = styled.div`
   width: 100%;
   margin-right: 60px;
   display: flex;
   justify-content: flex-end;
`
const StyledSpan = styled.span`
   padding: 0;
   font-family: 'DINNextRoundedLTW01-Regular';
   font-style: normal;
   font-weight: 600;
   font-size: 16px;
   line-height: 18px;
   color: #4b4759;
`

const Div = styled.div`
   margin: 42px 60px 16px;
`
const InputUpload = styled(Input)`
   display: none;
   padding-top: 30px;
`
const Style = styled.div`
   padding: 25px 0px 43px 60px;
`

const Span = styled.span`
   padding-left: 20px;
`
const StyledBtn = styled(Button)`
   margin-right: 16px;
   background-color: white;
   border-radius: 8px;
`
const InputStyled = styled(Input)`
   width: 517px;
   padding: 0px 60px;
`
