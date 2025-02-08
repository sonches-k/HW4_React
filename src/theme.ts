import { createTheme } from '@mui/material/styles';

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#7CFC00' },
    secondary: { main: '#98FB98' },
    background: { default: '#fffafa', paper: '#ffffff' },
    text: { primary: '#006400', secondary: '#008000' },
  },
  typography: {
    fontFamily: '"Luckiest Guy", cursive',
    h5: { fontWeight: 600 },
    body1: { fontSize: '0.9rem' },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#228B22' },
    secondary: { main: '#006400' },
    background: { default: '#1c1c1c', paper: '#292929' },
    text: { primary: '#00FF7F', secondary: '#3CB371' },
  },
  typography: {
    fontFamily: '"Luckiest Guy", cursive',
    h5: { fontWeight: 600 },
    body1: { fontSize: '0.9rem' },
  },
});
