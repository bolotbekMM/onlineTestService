import { FormControl, FormControlLabel, Radio } from '@mui/material'
import styled from 'styled-components'

const RadioButton = (props) => {
   const { onChange, value, ...other } = props
   return (
      <FormControl>
         <FormControlLabel
            value={value}
            onChange={onChange}
            {...other}
            label=""
            control={<StyledRadioButton />}
         />
      </FormControl>
   )
}

export default RadioButton
const StyledRadioButton = styled(Radio)`
   .MuiRadio-colorPrimary &.Mui-checked {
      color: #3a10e5;
   }
`
