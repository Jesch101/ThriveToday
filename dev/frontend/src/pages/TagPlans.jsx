import React, { useEffect, useState } from "react";
import { Box, ThemeProvider, Typography, IconButton } from "@mui/material";
import { theme } from "../themes/theme";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../axios";
import Loader from "../components/Loader";
import ViewPlans from "../components/ViewPlans";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

function TagPlans({ setBackground }) {
  const navigate = useNavigate();
  const { tag } = useParams();
  const [loading, setLoading] = useState(true);
  const [planList, setPlanList] = useState(null);

  const planTag = tag && tag.charAt(0).toUpperCase() + tag.slice(1);

  const getTagPlans = () => {
    axiosInstance
      .get(`/plans/${tag}`)
      .then((res) => {
        setPlanList(res.data);
      })
      .catch((err) => {
        return Promise.resolve(err.body);
      })
      .then(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    setBackground(true);
    if (!tag || !["mental", "physical", "education", "other"].includes(tag)) {
      navigate("/404");
    } else {
      getTagPlans();
    }
    return () => {
      setBackground(false);
    };
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Box sx={{ margin: "0 auto", width: "80%", flexGrow: "1" }}>
          <Box my={theme.spacing(10)} display="flex">
            <Typography variant="h3">{planTag} Plans</Typography>
          </Box>
          {loading ? (
            <Loader />
          ) : (
            <Box>
              {planList?.length ? (
                <ViewPlans plans={planList} />
              ) : (
                <Typography>
                  Uh oh! It seems there are no plans with that tag.
                </Typography>
              )}
            </Box>
          )}
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default TagPlans;
