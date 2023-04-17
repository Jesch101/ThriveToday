import React, { useContext, useEffect, useState } from "react";
import { theme } from "../themes/theme";
import { Box, ThemeProvider, Typography, Grid, Paper } from "@mui/material";
import UserContext from "../context/userContext";
import Loader from "../components/Loader";
import planData from "../data/fake_user_posts.json";
import likedPlans from "../data/fake_likes.json";
import PlansCard from "../components/PlansCard";
import AddPlanDialogue from "../components/AddPlanDialogue";
import LikesCard from "../components/LikesCard";

function totalLikes() {
  let total = 0;
  planData.forEach((plan) => {
    total += plan.likes;
  });
  return total;
}

function Profile({ setBackground }) {
  const { userInfoContext } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  const [userPlanData, setUserPlanData] = useState({});

  const getUserPlans = () => {
    setUserPlanData(planData);
    setIsLoading(false);
  };

  useEffect(() => {
    getUserPlans();
    setBackground(true);

    return () => {
      setBackground(false);
    };
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Box sx={{ margin: "0 auto", width: "80%", flexGrow: "1" }}>
          {isLoading ? (
            <Loader />
          ) : (
            <Box my={theme.spacing(10)}>
              <Box pb={theme.spacing(6)}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}>
                  <Typography
                    variant="h3"
                    sx={{ fontWeight: "bold" }}
                    pb={theme.spacing(1)}
                    pr={theme.spacing(4)}>
                    My Profile
                  </Typography>
                  <Box sx={{ display: "flex", flexDirection: "row" }}>
                    <Box>
                      <Paper
                        elevation={3}
                        sx={{
                          height: "80px",
                          width: "80px",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                          backgroundColor: theme.palette.primary.main,
                          color: "white",
                        }}>
                        <Typography variant="body1">
                          {userPlanData?.length}
                        </Typography>
                        <Typography variant="body1">Plans</Typography>
                      </Paper>
                    </Box>

                    <Box pl={theme.spacing(2)}>
                      <Paper
                        elevation={3}
                        sx={{
                          height: "80px",
                          width: "80px",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                          backgroundColor: "white",
                          color: "black",
                        }}>
                        <Typography
                          variant="body1"
                          color={theme.palette.primary.main}>
                          {totalLikes()}
                        </Typography>
                        <Typography variant="body1">Likes</Typography>
                      </Paper>
                    </Box>
                  </Box>
                </Box>
              </Box>
              <Box my={theme.spacing(4)}>
                <Grid container spacing="8">
                  <Grid item xs={12} md={6}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                      }}>
                      <Box
                        sx={{
                          width: "100%",
                          maxWidth: "450px",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}>
                        <Typography
                          variant="h4"
                          py={theme.spacing(1)}
                          fontWeight="bold">
                          My Plans
                        </Typography>
                        <AddPlanDialogue />
                      </Box>
                      {userPlanData && (
                        <PlansCard userPlanData={userPlanData} />
                      )}
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                      }}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          flexDirection: "row",
                          width: "100%",
                          maxWidth: "450px",
                        }}>
                        <Typography
                          variant="h4"
                          fontWeight="bold"
                          py={theme.spacing(1)}>
                          Liked Plans
                        </Typography>
                      </Box>
                      <LikesCard likedPlans={likedPlans} />
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default Profile;
