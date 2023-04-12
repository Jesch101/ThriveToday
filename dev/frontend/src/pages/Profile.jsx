import React, { useContext, useEffect, useState } from "react";
import theme from "../themes/theme";
import { Box, ThemeProvider, Typography, Grid, Button } from "@mui/material";
import UserContext from "../context/userContext";
import Loader from "../components/Loader";
import planData from "../data/fake_user_posts.json";
import PlansCard from "../components/PlansCard";
import AddPlanDialogue from "../components/AddPlanDialogue";

const RedLine = () => {
  return (
    <hr
      style={{
        width: "300px",
        border: `2px solid ${theme.palette.primary.main}`,
        borderRadius: "7px",
      }}
    />
  );
};

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
                <Typography
                  variant="h3"
                  sx={{ fontWeight: "bold" }}
                  pb={theme.spacing(1)}>
                  My Profile
                </Typography>
                <RedLine />
              </Box>
              <Box my={theme.spacing(4)}>
                <Grid container spacing="2">
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
                  <Grid item xs={12} md={6}></Grid>
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
