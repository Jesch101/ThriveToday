import React, { useContext } from "react";
import {
  Box,
  Typography,
  ThemeProvider,
  Button,
  CardContent,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import CenterBox from "../components/CenterBox";
import { theme } from "../themes/theme";
import HoverCard from "../components/HoverCard";
import { Link } from "react-router-dom";
import UserContext from "../context/userContext";

const LinkStyles = {
  color: "inherit",
  textDecoration: "none",
};

function Home() {
  const { userInfoContext } = useContext(UserContext);
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <Box
          sx={{
            margin: "0 auto",
            width: "80%",
            flexGrow: "1",
          }}
          pt={theme.spacing(10)}>
          <Grid container spacing="2">
            <Grid xs={12} md={6}>
              <Box>
                <Box>
                  <Typography
                    sx={{
                      fontWeight: "semibold",
                      fontSize: "58px",
                      lineHeight: "1",
                    }}>
                    Transform Your Health and Wellness Journey
                  </Typography>
                </Box>
                <Box pt={theme.spacing(4)}>
                  <Typography sx={{ fontWeight: "regular", fontSize: "22px" }}>
                    Create custom plans, share your own tips and techniques, and
                    explore a supportive community dedicated to a healthier
                    lifestyle.
                  </Typography>
                </Box>
                <Box pt={theme.spacing(4)}>
                  <Link
                    to={userInfoContext.email ? "/add-plan" : "/sign-up"}
                    style={{ textDecoration: "none" }}>
                    <Button variant="contained" size="large">
                      Get Started
                    </Button>
                  </Link>
                </Box>
              </Box>
            </Grid>
            <Grid xs={12} md={6}>
              <CenterBox />
            </Grid>
          </Grid>
          <Box mt={theme.spacing(6)}>
            <Typography sx={{ fontSize: "22px", fontWeight: "semibold" }}>
              Check out what plans we have to offer!
            </Typography>
            <hr
              style={{
                width: "300px",
                border: `2px solid ${theme.palette.primary.main}`,
                borderRadius: "7px",
              }}
            />
          </Box>
          <Box my={theme.spacing(10)}>
            <Grid container spacing={{ xs: 4 }}>
              <Grid xs={12} md={4}>
                <CenterBox>
                  <Link to="/" style={LinkStyles}>
                    <HoverCard>
                      <CardContent>
                        <CenterBox
                          sx={{
                            flexDirection: "column",
                          }}>
                          <Box sx={{ fontSize: "60px" }}>🏃</Box>
                          <Typography
                            sx={{ fontSize: "34px", fontWeight: "bold" }}>
                            Physical
                          </Typography>
                          <CenterBox>
                            <Typography
                              pt={theme.spacing(2)}
                              sx={{
                                fontSize: "20px",
                                textAlign: "center",
                              }}>
                              Find community curated fitness plans that work for
                              you.
                            </Typography>
                          </CenterBox>
                        </CenterBox>
                      </CardContent>
                    </HoverCard>
                  </Link>
                </CenterBox>
              </Grid>
              <Grid xs={12} md={4}>
                <CenterBox>
                  <Link to="/" style={LinkStyles}>
                    <HoverCard>
                      <CardContent>
                        <CenterBox
                          sx={{
                            flexDirection: "column",
                          }}>
                          <Box sx={{ fontSize: "60px" }}>🧘‍♀️</Box>
                          <Typography
                            sx={{ fontSize: "34px", fontWeight: "bold" }}>
                            Mental
                          </Typography>
                          <CenterBox>
                            <Typography
                              pt={theme.spacing(2)}
                              sx={{
                                fontSize: "20px",
                                textAlign: "center",
                              }}>
                              Discover new ways to improve your mental health
                              and wellness.
                            </Typography>
                          </CenterBox>
                        </CenterBox>
                      </CardContent>
                    </HoverCard>
                  </Link>
                </CenterBox>
              </Grid>

              <Grid xs={12} md={4}>
                <CenterBox>
                  <Link to="/" style={LinkStyles}>
                    <HoverCard>
                      <CardContent>
                        <CenterBox
                          sx={{
                            flexDirection: "column",
                          }}>
                          <Box sx={{ fontSize: "60px" }}>📚</Box>
                          <Typography
                            sx={{ fontSize: "34px", fontWeight: "bold" }}>
                            Academic
                          </Typography>
                          <CenterBox>
                            <Typography
                              pt={theme.spacing(2)}
                              sx={{
                                fontSize: "20px",
                                textAlign: "center",
                              }}>
                              Explore innovative ways to and learn something
                              new.
                            </Typography>
                          </CenterBox>
                        </CenterBox>
                      </CardContent>
                    </HoverCard>
                  </Link>
                </CenterBox>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default Home;
