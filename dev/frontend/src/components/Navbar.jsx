import React, { useContext, useEffect, useState } from "react";
import { Box, ThemeProvider, Typography, styled } from "@mui/material";
import theme from "../themes/theme";
import logo from "../assets/logo.svg";
import { Link } from "react-router-dom";
import CenterBox from "../components/CenterBox";
import UserContext from "../context/userContext";

const NavItem = styled(Typography)`
  text-decoration: none;
  color: inherit;
  position: relative;
  cursor: pointer;
  font-size: 20px;
  font-weight: medium;
  &:after {
    content: "";
    position: absolute;
    width: 100%;
    transform: scaleX(0);
    height: 2px;
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

function Navbar() {
  const { userInfoContext } = useContext(UserContext);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    setUsername(userInfoContext?.username);
    console.log(userInfoContext);
  }, [userInfoContext]);

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          position: "sticky",
          overflow: "hidden",
          paddingTop: `${theme.spacing(3)}`,
        }}>
        <Box
          className="container"
          sx={{
            margin: "0 auto",
            width: "80%",
          }}>
          <CenterBox>
            <Link
              to="/"
              style={{
                textDecoration: "none",
                color: "inherit",
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                flex: "1",
              }}>
              <img
                src={logo}
                alt="logo"
                style={{ width: "60px", height: "60px" }}
              />
              <Typography
                pl={theme.spacing(1)}
                sx={{
                  fontSize: "36px",
                  fontWeight: "semibold",
                }}>
                ThriveToday
              </Typography>
            </Link>
            <Box
              className="menu-items"
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flex: "1.5",
              }}>
              <Box px={theme.spacing(5)}>
                <Link
                  to="/about"
                  style={{ textDecoration: "none", color: "inherit" }}>
                  <NavItem>About</NavItem>
                </Link>
              </Box>
              <Box px={theme.spacing(5)}>
                <Link
                  to="/popular-plans"
                  style={{ textDecoration: "none", color: "inherit" }}>
                  <NavItem>Popular Plans</NavItem>
                </Link>
              </Box>
              <Box ml="auto" pr={theme.spacing(5)}>
                {username ? (
                  <NavItem>{username}</NavItem>
                ) : (
                  <Link
                    to="/login"
                    style={{ textDecoration: "none", color: "inherit" }}>
                    <NavItem>Sign In</NavItem>
                  </Link>
                )}
              </Box>
            </Box>
          </CenterBox>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default Navbar;
