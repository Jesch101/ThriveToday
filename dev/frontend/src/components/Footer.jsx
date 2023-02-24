import React from "react";
import { Box, Typography, ThemeProvider } from "@mui/material";
import theme from "../themes/theme";

function Footer() {
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          width: "calc(100% + 2rem)",
          backgroundColor: "black",
          color: "#F8FAFC",
        }}>
        <Box p={theme.spacing(6)}>
          <Typography variant="body1">
            SJSU CS 161 Project - Team "ThriveToday"
          </Typography>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default Footer;
