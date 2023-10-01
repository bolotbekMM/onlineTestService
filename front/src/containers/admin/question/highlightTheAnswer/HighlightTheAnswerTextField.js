import React from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'

const HighlightTheAnswerTextField = ({ onChageHandler, value }) => {
   const handleChange = (event) => {
      onChageHandler(event.target.value)
   }

   return (
      <Box
         sx={{
            '& .MuiTextField-root': { width: '100%' },
         }}
         noValidate
         autoComplete="off"
      >
         <TextField
            id="outlined-name"
            multiline
            maxRows={6}
            value={value}
            onChange={handleChange}
         />
      </Box>
   )
}

export default HighlightTheAnswerTextField
