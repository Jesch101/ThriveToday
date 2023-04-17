import React from "react";
import { Box, Typography, ThemeProvider, Container } from "@mui/material";
import { theme } from "../themes/theme";

function Footer() {
  return (
    <ThemeProvider theme={theme}>
      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: "auto",
          backgroundColor: "black",
          color: "white",
        }}>
        <Container maxWidth="sm">
          <Typography variant="body1">CS 161 Team ThriveToday</Typography>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default Footer;
