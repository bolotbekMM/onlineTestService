import React from 'react'
import styled from 'styled-components'
import ReCheckbox from '../../../../components/UI/checkbox'
import Trash from '../../../../assets/icons/trash.svg'

function WordItem({ words, deleteWord, checkedHandler, index }) {
   return (
      <Box>
         <span>{index}</span>
         <Item>{words.word}</Item>
         <StyledDivIcons>
            <ReCheckbox
               checked={words.correct}
               onClick={() => checkedHandler(words.id)}
            />
            <StyledTrash
               src={Trash}
               alt="trash"
               onClick={() => deleteWord(words.id)}
            />
         </StyledDivIcons>
      </Box>
   )
}

export default WordItem

const Box = styled.li`
   width: 280px;
   height: 46px;
   margin-top: 18px;
   margin-right: 18px;
   padding: 14px 16px;
   background: #ffffff;
   border: 1.53px solid #d4d0d0;
   box-sizing: border-box;
   border-radius: 8px;
   display: flex;
   justify-content: space-between;
   align-items: center;
`

const Item = styled.span`
   font-family: 'DINNextRoundedLTW01-Regular';
   font-style: normal;
   font-weight: 700;
   font-size: 18px;
   line-height: 16px;
   color: #4c4859;
   margin-right: 10px;
   margin-left: 17px;
`
const StyledDivIcons = styled.div`
   width: 66px;
   display: flex;
   justify-content: space-between;
`
const StyledTrash = styled.img`
   width: 23px;
   height: 22px;
   margin-top: 9px;
`
