import { createTheme, ThemeProvider } from '@mui/material/styles';
import palette from './pallete';
import CssBaseline from '@mui/material/CssBaseline';

const ThemeConfig = ( {children} : any ):JSX.Element => {
  
    const themeOptions = {
    palette,
};

const theme = createTheme(themeOptions)

return(
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      {children}
     </ThemeProvider>
);
}

export default ThemeConfig;