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
