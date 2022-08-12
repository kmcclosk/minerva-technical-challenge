import React, { PropsWithChildren } from 'react';
import { UserProvider } from './UserProvider';
import { DataProvider } from './DataProvider';
import { APIProvider } from './APIProvider';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const baseTheme = createTheme({
  palette: {
    // darkBackground: '#392139',
    background: {
      default: '#392139',
    },
    text: {
      primary: '#ffffff',
    },
    /*
        primary: {
            main: "#2a9461"
        },
        secondary: {
            main: "#494c7d"
        }
        */
  },
});

const themeOverrides = createTheme({
  components: {
    MuiInputBase: {
      styleOverrides: {
        input: {
          color: 'black',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          color: 'black',
        },
      },
    },
  },
});

const theme = createTheme(themeOverrides, baseTheme);

export function Providers(props: PropsWithChildren<{}>) {
  const { children } = props;

  return (
    <DataProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <UserProvider>
          <APIProvider>{children}</APIProvider>
        </UserProvider>
      </ThemeProvider>
    </DataProvider>
  );
}
