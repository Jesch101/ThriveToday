import React from "react";
import { Box, Button, ThemeProvider, Typography } from "@mui/material";
import theme from "../themes/theme";
import logo from "../assets/logo.svg";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";

const StyledTypographyLink = styled(Typography)`
  text-decoration: none;
  color: inherit;
  position: relative;
  cursor: pointer;
  font-size: 24px;

  &:after {
    content: "";
    position: absolute;
    width: 100%;
    transform: scaleX(0);
    height: 2.5px;
    bottom: 0;
    left: 0;
    background-color: #a70000;
    transform-origin: bottom right;
    transition: transform 0.25s ease-out;
  }

  &:hover:after {
    transform: scaleX(1);
    transform-origin: bottom left;
  }
`;

const TypographyLink = (props) => (
  <StyledTypographyLink component={Link} to={props.to} variant={props.variant}>
    {props.children}
  </StyledTypographyLink>
);

function Navbar() {
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: "flex",
          position: "sticky",
          alignItems: "center",
          overflow: "hidden",
          pt: "20px",
          px: "30px",
        }}>
        <Link
          to="/"
          style={{
            textDecoration: "none",
            color: "inherit",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
          <img
            src={logo}
            alt="logo"
            style={{ height: "60px", width: "auto" }}
          />
          <Typography variant="h3" sx={{ fontWeight: "500", flex: "1" }} pl={2}>
            ThriveToday
          </Typography>
        </Link>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto",
            flex: "1",
          }}
          px={6}>
          <Box px={theme.spacing(3)}>
            <TypographyLink to="/about">About Us</TypographyLink>
          </Box>
          <Box px={theme.spacing(3)}>
            <TypographyLink to="/popular-plans">Popular Plans</TypographyLink>
          </Box>
        </Box>
        <Box
          sx={{
            marginLeft: "auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
          <Button
            variant="contained"
            color="primary"
            sx={{
              "&:hover": {
                boxShadow: "none",
              },
              "&:active": {
                boxShadow: "none",
              },
              typography: {
                fontSize: "20px",
              },
              height: "42px",
              width: "128px",
            }}>
            Sign In
          </Button>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default Navbar;
