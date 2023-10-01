import React from 'react'
import { Select } from '@mui/material'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import styled from 'styled-components'

const StyledSelect = styled(Select)`
   & .MuiModal-root {
      margin-top: 9px;
   }
   width: 900px;
`

const StyledMenuIte = styled(MenuItem)`
   color: #4c4859;
   font-size: 16px;
   line-height: 18px;
   display: flex;
   padding-bottom: 14px;
   padding-top: 14px;
   text-align: center;
   border-radius: 8px;

   &.MuiMenuItem-root:active {
      background-color: #3a10e5;
      border-radius: 8px;
      color: #fffeff;
   }
   ::before {
      content: '';
      position: absolute;
      left: 10;
      bottom: 0;
      height: 1px;
      width: 95%; /* or 100px */
      border-bottom: 1px solid #d4d0d0;
   }

   :last-child::before {
      border-bottom: none;
   }
`

export default function AppSelect({ options, onChange, value, ...props }) {
   const [open, setOpen] = React.useState(false)

   const handleClose = () => {
      setOpen(false)
   }

   const handleOpen = () => {
      setOpen(true)
   }

   return (
      <div>
         <FormControl fullWidth>
            <StyledSelect
               labelId="dopen-select-label"
               id="open-select"
               open={open}
               onClose={handleClose}
               onOpen={handleOpen}
               value={value}
               onChange={onChange}
               MenuProps={{ disablePortal: true }}
               {...props}
            >
               {options.map((item) => (
                  <StyledMenuIte key={item.id} value={item.id}>
                     {item.label}
                  </StyledMenuIte>
               ))}
            </StyledSelect>
         </FormControl>
      </div>
   )
}
