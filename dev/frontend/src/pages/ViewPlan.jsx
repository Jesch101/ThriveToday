import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  Box,
  Typography,
  Grid,
  ThemeProvider,
  IconButton,
  Stack,
} from "@mui/material";
import { theme } from "../themes/theme";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import UserContext from "../context/userContext";
import axiosInstance from "../axios";
import Loader from "../components/Loader";
import ViewPlanContent from "../components/ViewPlanContent";

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
    Mental: ["#9BC978", "/plans-by-tag/mental"],
    Physical: ["#BB8028", "/plans-by-tag/physical"],
    Education: ["#994E52", "/plans-by-tag/education"],
    Other: ["#676767", "/plans-by-tag/other"],
  };
  return colors[tag];
}

const LinkStyles = {
  color: "inherit",
  textDecoration: "none",
};

function ViewPlan({ setBackground }) {
  const navigate = useNavigate();
  const { planid } = useParams();
  const { userInfoContext } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [planData, setPlanData] = useState(null);

  const getPlanInfo = async (planid) => {
    try {
      const res = await axiosInstance.get(`/plans/${planid}`);
      if (!res.data) {
        navigate("/*");
      }
      if (res.data.userid === userInfoContext.userid) {
        setPlanData({ author: userInfoContext.username, ...res.data });
      } else {
        const userInfoRes = await getUserInfo(res.data.userid);
        setPlanData({ author: userInfoRes.data.username, ...res.data });
      }
    } catch (err) {
      Promise.resolve(err.response);
    } finally {
      setLoading(false);
    }
  };

  const getUserInfo = async (userid) => {
    try {
      const res = await axiosInstance.get(`/users/${userid}`);
      return res;
    } catch (err) {
      Promise.resolve(err.response);
    }
  };

  const handleLike = () => {
    axiosInstance
      .put(`/plans/${planData?.postid}/like`)
      .then((res) => {
        if (res.data == "Post has been unliked") {
          setPlanData({ ...planData, likes: planData.likes - 1 });
        } else {
          setPlanData({ ...planData, likes: planData.likes + 1 });
        }
      })
      .catch((err) => {
        Promise.resolve(err.response);
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

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Box sx={{ margin: "0 auto", width: "80%", flexGrow: "1" }}>
          {loading ? (
            <Loader />
          ) : (
            <>
              <Box my={theme.spacing(10)}>
                <Grid container spacing="2">
                  <Grid item xs={12} md={9}>
                    <Stack direction="row">
                      <Typography variant="h2" sx={{ fontWeight: "500" }}>
                        {planData && planData.post_title}
                      </Typography>
                    </Stack>
                    <Link to={tagColor(planData.tag)[1]} style={LinkStyles}>
                      <Box
                        mt={theme.spacing(1)}
                        sx={{
                          border: "2px solid",
                          borderColor: planData
                            ? `${tagColor(planData.tag)[0]}`
                            : "grey",
                          backgroundColor: planData
                            ? `${tagColor(planData.tag)[0]}`
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
                    </Link>
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
                      <Stack direction="row" alignItems="center">
                        <IconButton onClick={handleLike}>
                          <FavoriteBorderIcon />
                        </IconButton>
                        <Typography variant="body1">
                          <b>{planData && planData.likes}</b>
                        </Typography>
                      </Stack>
                    </Box>
                  </Grid>
                </Grid>

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
              <ViewPlanContent planData={planData} />
            </>
          )}
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default ViewPlan;
