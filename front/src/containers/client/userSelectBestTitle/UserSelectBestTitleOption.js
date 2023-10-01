import React from 'react'
import styled from 'styled-components'

function UserSelectBestTitleOption({ option, onChangeRadioButtonHandler }) {
   const radioButtonChangeHandler = (optionId) => {
      onChangeRadioButtonHandler({ optionId, answer: true })
   }

   return (
      <Box>
         <StyledDivIcons>
            <input
               type="radio"
               onChange={() => radioButtonChangeHandler(option.id)}
               color="primary"
               name="something"
            />
         </StyledDivIcons>
         <P>{option.word}</P>
      </Box>
   )
}

export default UserSelectBestTitleOption

const P = styled('p')`
   margin: 0 auto;
   font-size: 16px;
   font-family: 'DINNextRoundedLTW01';
   color: #4c4859;
`
const Box = styled('li')`
   margin-top: 30px;
   padding: 12px 18px;
   background: #ffffff;
   border: 1.53px solid #d4d0d0;
   box-sizing: border-box;
   border-radius: 8px;
   display: flex;
   justify-content: space-between;
   align-items: center;
`
const StyledDivIcons = styled('div')`
   display: flex;
   justify-content: space-between;
`
