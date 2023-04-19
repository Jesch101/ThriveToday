import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Grid,
  ThemeProvider,
  IconButton,
  Stack,
  Button,
} from "@mui/material";
import { theme } from "../themes/theme";
import EditIcon from "@mui/icons-material/Edit";
import UserContext from "../context/userContext";
import axiosInstance from "../axios";
import Loader from "../components/Loader";

function formatDate(dateString) {
  const date = new Date(dateString);
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);
  return formattedDate;
}

function tagColor(tag) {
  const colors = {
    Mental: "#9BC978",
    Physical: "#BB8028",
    Education: "#994E52",
    Other: "#676767",
  };
  return colors[tag];
}

function ViewPlan({ setBackground }) {
  const navigate = useNavigate();
  const { planid } = useParams();
  const { userInfoContext } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [planData, setPlanData] = useState(null);

  const getPlanInfo = (planid) => {
    axiosInstance
      .get(`/plans/${planid}`)
      .then((res) => {
        let response = res.data;
        // Plan id does not exist, redirect to error page
        if (!res.data) {
          navigate("/*");
        }
        // User id is the same so no need for another api call
        if (response.userid === userInfoContext.userid) {
          setPlanData({ author: userInfoContext.username, ...response });
        }
      })
      .catch((err) => {
        Promise.resolve(err.response);
      })
      .then(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (!isNaN(planid)) {
      getPlanInfo(planid);
    } else {
      navigate("/*");
      setLoading(false);
    }
    setBackground(true);
    return () => {
      setBackground(false);
    };
  }, []);

  if (planData) {
    console.log(planData);
  }

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Box sx={{ margin: "0 auto", width: "80%", flexGrow: "1" }}>
          {loading ? (
            <Loader />
          ) : (
            <Box my={theme.spacing(10)}>
              <Grid container spacing="2">
                <Grid item xs={12} md={9}>
                  <Stack direction="row">
                    <Typography variant="h3" sx={{ fontWeight: "500" }}>
                      {planData && planData.post_title}
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}>
                      <IconButton>
                        <EditIcon />
                      </IconButton>
                    </Box>
                  </Stack>
                </Grid>
                <Grid item xs={12} md={3}>
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <Typography variant="body1">
                      Created By: <b>{planData && planData.author}</b>
                    </Typography>
                    <Typography variant="body1">
                      Created on:{" "}
                      <b>{planData && formatDate(planData.date_created)}</b>
                    </Typography>
                  </Box>
                </Grid>
              </Grid>

              <Box
                mt={theme.spacing(1)}
                sx={{
                  border: "2px solid",
                  borderColor: planData ? `${tagColor(planData.tag)}` : "grey",
                  backgroundColor: planData
                    ? `${tagColor(planData.tag)}`
                    : "grey",
                  borderRadius: "20px",
                  display: "inline-flex",
                  justifyContent: "center",
                  alignItems: "center",
                  color: "white",
                  "&:hover": {
                    cursor: "pointer",
                  },
                }}>
                <Typography
                  variant="body1"
                  sx={{ fontWeight: "500" }}
                  px={theme.spacing(1)}>
                  {planData && planData.tag}
                </Typography>
              </Box>

              <Box
                mt={theme.spacing(8)}
                sx={{ display: "flex", justifyContent: "center" }}>
                <hr
                  style={{
                    width: "300px",
                    border: `2px solid ${theme.palette.primary.main}`,
                    borderRadius: "7px",
                  }}
                />
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default ViewPlan;
