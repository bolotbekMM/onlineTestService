import * as React from 'react'
import Box from '@mui/material/Box'
import LinearProgress from '@mui/material/LinearProgress'
import styled from 'styled-components'

const StyledBox = styled(Box)`
   width: 1006px;
   height: 8px;
   margin-bottom: 50px;
   margin-top: 20px;
`
const StyledLinerProgress = styled(LinearProgress)`
   &.MuiLinearProgress-root {
      background: #d4d0d0;
   }
   & .MuiLinearProgress-bar1Determinate {
      background-color: #3a10e5;
   }
`
export default function LinearDeterminateLong({ percent }) {
   return (
      <StyledBox>
         <StyledLinerProgress variant="determinate" value={percent} />
      </StyledBox>
   )
}
