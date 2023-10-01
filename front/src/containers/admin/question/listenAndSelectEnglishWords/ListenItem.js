import React from 'react'
import styled from 'styled-components'
import ReCheckbox from '../../../../components/UI/checkbox'
import { ReactComponent as Trash } from '../../../../assets/icons/trash.svg'
import SoundIcon from '../../../../assets/icons/sound.svg'
import { GET_FILE_FROM_SERVER } from '../../../../utils/constants/general'

function ListenItem({ option, deleteWord, checkedHandler }) {
   const [buttonName, setButtonName] = React.useState('Play')

   const handleClick = () => {
      const data = option
      if ('file' in data) {
         const audio = new Audio(`${GET_FILE_FROM_SERVER}/${option.file}`)
         audio.play()
      } else if ('file' in data.fileName) {
         if (buttonName === 'Play') {
            option.fileName.play.play()
            setButtonName('Pause')
         } else {
            option.fileName.play.pause()
            setButtonName('Play')
         }
      }
   }
   return (
      <Box>
         <StyledIcon
            key={option.id}
            onClick={handleClick}
            src={SoundIcon}
            alt="volume"
         >
            {option.audio}
         </StyledIcon>
         <Item>{option.word}</Item>
         <StyledDivIcons>
            <ReCheckbox
               checked={option.correct}
               onClick={() => checkedHandler(option.id)}
            />
            <StyledTrash onClick={() => deleteWord(option.id)} />
         </StyledDivIcons>
      </Box>
   )
}

export default ListenItem

const Box = styled.li`
   min-width: 241px;
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
   &::before {
      content: counter(my-counter);
      counter-increment: my-counter;
      color: black;
      width: 20px;
   }
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
   cursor: pointer;
`
const StyledTrash = styled(Trash)`
   width: 23px;
   height: 22px;
   margin-top: 9px;
   cursor: pointer;
   color: #9a9a9a;
   :hover {
      color: red;
   }
`
const StyledIcon = styled.img`
   width: 23px;
   height: 22px;
   cursor: pointer;
`
