import { createTheme } from '@mui/material/styles';

const muiTheme = createTheme({
  palette: {
    primary: {
      main: '#2FA5BC',
      dark: '#07779E',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#00486A',
      dark: '#E4E9EB',
    },
  },
  typography: {
    fontFamily: 'TitilliumText25L, Arial, sans-serif',
  },
});

export default muiTheme;
