import { TextField } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React from 'react'

const StyledTextField = makeStyles({
   root: {
      '& .MuiInputBase-root': {
         borderRadius: 8,
         marginTop: 10,
      },
   },
})
function Input(props) {
   const inputClasses = StyledTextField()
   const { placeholder, children, classes, fullWidth, accept, ...other } = props
   return (
      <TextField
         className={inputClasses.root}
         placeholder={placeholder}
         fullWidth={fullWidth}
         classes={classes}
         sx={{ width: '100%' }}
         accept={accept}
         {...other}
      >
         {children}
      </TextField>
   )
}
export default Input
