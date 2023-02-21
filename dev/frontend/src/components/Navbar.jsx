import React from "react";
import { Box, Button, ThemeProvider, Typography } from "@mui/material";
import theme from "../themes/theme";
import logo from "../assets/logo.svg";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";

function Navbar() {
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: "flex",
          position: "sticky",
          alignItems: "center",
          overflow: "hidden",
        }}></Box>
    </ThemeProvider>
  );
}

export default Navbar;
