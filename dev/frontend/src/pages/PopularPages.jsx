import React from "react";
import { ThemeProvider, Box, Typography } from "@mui/material";
import theme from "../themes/theme";

function PopularPages() {
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
          <Typography variant="h3">Popular Plans</Typography>
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

export default PopularPages;
