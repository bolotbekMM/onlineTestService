import { createTheme } from '@mui/material'

export const theme = createTheme({
   palette: {
      primary: {
         main: '#3A10E5',
      },

      secondary: {
         main: '#41994d',
      },
      inherit: {
         main: '#4C4C4C',
      },
      white: {
         main: '#fff',
      },
   },

   shape: {
      borderRadius: 8,
   },
})
