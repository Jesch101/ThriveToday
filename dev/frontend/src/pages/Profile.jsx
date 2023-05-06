import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { theme } from "../themes/theme";
import { Box, ThemeProvider, Typography, Grid, Paper } from "@mui/material";
import UserContext from "../context/userContext";
import Loader from "../components/Loader";
import AddPlanDialogue from "../components/AddPlanDialogue";
import LikesCard from "../components/LikesCard";
import PlansCard from "../components/PlansCard";
import axiosInstance from "../axios";

function Profile({ setBackground }) {
  const { userInfoContext } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  const [userPlanData, setUserPlanData] = useState(null);
  const [newPlanName, setNewPlanName] = useState(null);
  const [planTag, setPlanTag] = useState("Other");
  const [totalLikes, setTotalLikes] = useState(0);
  const [likedPlans, setLikedPlans] = useState(null);

  const navigate = useNavigate();
  const currentDate = new Date().toISOString();

  const getUserPlans = () => {
    axiosInstance
      .get(`users/${userInfoContext?.userid}/all-plans`)
      .then((res) => {
        const result = res.data;
        setUserPlanData(result);
      })
      .catch((err) => {
        Promise.resolve(err.response);
      })
      .then(() => {
        setIsLoading(false);
      });
  };

  const getUserLikes = () => {
    let userid = userInfoContext?.userid;
    if (userid) {
      axiosInstance
        .get(`/users/${userid}/likes`)
        .then((res) => {
          const result = res.data;
          setLikedPlans(result);
        })
        .catch((err) => {
          Promise.resolve(err.response);
        });
    }
  };

  const handleNewPlanNameSubmit = (e) => {
    e.preventDefault();
    axiosInstance
      .post("/plans/create", {
        post_title: newPlanName,
        date_created: currentDate,
        tag: planTag,
      })
      .then((res) => {
        navigate(`/view-plan/${res.data.postid}`);
      })
      .catch((err) => {
        Promise.resolve(err.response);
      });
  };

  const handlePlanNameChange = (e) => {
    setNewPlanName(e.target.value);
  };

  const handlePlanTagChange = (e) => {
    setPlanTag(e.target.value);
  };

  useEffect(() => {
    if (userPlanData) {
      let totalUserLikes = userPlanData.reduce(
        (acc, post) => acc + post.likes,
        0
      );
      setTotalLikes(totalUserLikes);
    }
  }, [userPlanData]);

  useEffect(() => {
    getUserPlans();
    getUserLikes();
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
                          {userPlanData ? userPlanData?.length : 0}
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
                        <Typography variant="body1">{totalLikes}</Typography>
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
                        <AddPlanDialogue
                          handleSubmit={handleNewPlanNameSubmit}
                          handleChange={handlePlanNameChange}
                          handlePlanTagChange={handlePlanTagChange}
                          planTag={planTag}
                        />
                      </Box>
                      {userPlanData ? (
                        <PlansCard userPlanData={userPlanData} />
                      ) : (
                        <Typography
                          variant="h6"
                          fontWeight="semibold"
                          py={theme.spacing(1)}>
                          You have no plans yet!
                        </Typography>
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
                      {likedPlans && <LikesCard likedPlans={likedPlans} />}
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
