import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#A70000",
    },
    secondary: {
      main: "#f50057",
    },
  },
  typography: {
    color: "#333333",
    button: {
      textTransform: "none",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
        containedPrimary: {
          backgroundColor: "#A70000",
        },
        outlinedPrimary: {
          borderColor: "#A70000",
        },
      },
    },
  },
});

export default theme;
