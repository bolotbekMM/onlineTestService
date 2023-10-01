import React from 'react'
import Checkbox from '@mui/material/Checkbox'

export default function ReCheckbox({ checked, onChange, ...otherProps }) {
   return (
      <Checkbox
         checked={checked}
         onChange={onChange}
         {...otherProps}
         sx={{
            '&.Mui-checked .MuiSvgIcon-root': {
               color: '#2AB930',
            },
         }}
      />
   )
}
