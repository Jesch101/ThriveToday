import React, { useContext, useEffect, useState } from "react";
import theme from "../themes/theme";
import { Box, ThemeProvider, Typography } from "@mui/material";
import UserContext from "../context/userContext";
import Loader from "../components/Loader";
import planData from "../data/fake_post_data.json";

const RedLine = () => {
  return (
    <hr
      style={{
        position: "absolute",
        width: "300px",
        left: "50%",
        transform: "translateX(-50%)",
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
              <Typography variant="h3" pb={theme.spacing(10)}>
                My Profile
              </Typography>
              <RedLine />
            </Box>
          )}
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default Profile;
