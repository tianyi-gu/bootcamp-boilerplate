import { createTheme } from '@mui/material/styles'

// Dropbox-inspired theme with matte colors and subtle shadows
const theme = createTheme({
  cssVariables: true,
  palette: {
    mode: 'light',
    primary: {
      main: '#0061FF', // Dropbox blue
      light: '#3D87FF',
      dark: '#0051D5',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#7B61FF', // Dropbox purple accent
      light: '#9D85FF',
      dark: '#5D47CC',
    },
    success: {
      main: '#00C875', // Matte green
      light: '#33D392',
      dark: '#00A05E',
    },
    error: {
      main: '#E2445C', // Matte red
      light: '#E8667B',
      dark: '#C92A44',
    },
    warning: {
      main: '#FFB020', // Matte orange
      light: '#FFC44D',
      dark: '#E09100',
    },
    background: {
      default: '#F7F9FC', // Very soft blue-gray
      paper: '#FFFFFF',
    },
    text: {
      primary: '#1E1919', // Dropbox's dark text
      secondary: '#637381', // Matte gray
    },
    divider: '#E7EBF0',
  },
  shape: {
    borderRadius: 8, // Dropbox uses subtle rounded corners
  },
  typography: {
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
    h3: {
      fontWeight: 600,
      fontSize: '2.25rem',
      lineHeight: 1.2,
      color: '#1E1919',
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.75rem',
      lineHeight: 1.3,
      color: '#1E1919',
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.5rem',
      lineHeight: 1.4,
      color: '#1E1919',
    },
    h6: {
      fontWeight: 600,
      fontSize: '1.25rem',
      lineHeight: 1.4,
      color: '#1E1919',
    },
    subtitle1: {
      fontWeight: 500,
      fontSize: '1rem',
      lineHeight: 1.5,
      color: '#637381',
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
      color: '#1E1919',
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
      color: '#637381',
    },
    button: {
      textTransform: 'none', // Dropbox doesn't use all caps
      fontWeight: 500,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '10px 20px',
          fontSize: '0.9375rem',
          fontWeight: 500,
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 2px 8px rgba(0, 97, 255, 0.15)',
          },
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 2px 8px rgba(0, 97, 255, 0.2)',
          },
          '&:active': {
            boxShadow: 'none',
          },
        },
        outlined: {
          borderWidth: '1.5px',
          '&:hover': {
            borderWidth: '1.5px',
            backgroundColor: 'rgba(0, 97, 255, 0.04)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.06)', // Subtle Dropbox-style shadow
          border: '1px solid #E7EBF0',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)',
            transform: 'translateY(-2px)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.06)',
        },
        elevation1: {
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.06)',
        },
        elevation2: {
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.06)',
          borderBottom: '1px solid #E7EBF0',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
            backgroundColor: '#FFFFFF',
            '& fieldset': {
              borderColor: '#DFE3E8',
              borderWidth: '1.5px',
            },
            '&:hover fieldset': {
              borderColor: '#0061FF',
            },
            '&.Mui-focused fieldset': {
              borderWidth: '1.5px',
              borderColor: '#0061FF',
            },
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          fontWeight: 500,
          fontSize: '0.8125rem',
        },
        outlined: {
          borderWidth: '1.5px',
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 12,
          boxShadow: '0 12px 32px rgba(0, 0, 0, 0.12), 0 4px 8px rgba(0, 0, 0, 0.08)',
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          '&:hover': {
            backgroundColor: 'rgba(0, 97, 255, 0.08)',
          },
        },
      },
    },
  },
})

export default theme


