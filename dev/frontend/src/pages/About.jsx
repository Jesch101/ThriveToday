import React from "react";
import theme from "../themes/theme";
import { Box, ThemeProvider, Typography } from "@mui/material";

function About() {
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}>
        <Box
          sx={{ margin: "0 auto", width: "80%", flexGrow: "1" }}
          pt={theme.spacing(10)}>
          <Typography variant="h3">About us!</Typography>
          <hr
            style={{
              width: "300px",
              border: `2px solid ${theme.palette.primary.main}`,
              borderRadius: "7px",
            }}
          />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default About;
