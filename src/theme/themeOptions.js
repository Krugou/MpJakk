import '@fontsource/Merriweather/400.css';
import '@fontsource/Merriweather/700.css';
import '@fontsource/work-sans/400.css';
import '@fontsource/work-sans/700.css';

const themeOptions = {
  palette: {
    primary: {
      main: '#1a237e',
    },
    secondary: {
      main: '#ff6f00',
    },
  },
  typography: {
    fontFamily: ['Merriweather', 'Work sans'].join(','), // Work Sans
    h1: {
      fontFamily: 'Merriweather',
      fontWeight: 700,
      fontSize: '3rem',
      lineHeight: 1.167,
      letterSpacing: '-0.01562em',
    },
    h2: {
      fontFamily: 'Work Sans',
      fontWeight: 700,
    },
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '*': {
          boxSizing: 'border-box',
        },
        html: {
          WebkitFontSmoothing: 'auto',
          height: '100%',
        },
        body: {
          height: '100%',
          margin: 0,
        },
        '#root': {
          height: '100%',
        },
      },
    },
  },
};
export {themeOptions};
