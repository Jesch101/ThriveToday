import React, { useEffect, useState } from "react";
import { Box, ThemeProvider, Typography, Stack } from "@mui/material";
import { theme } from "../themes/theme";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../axios";
import Loader from "../components/Loader";
import ViewPlans from "../components/ViewPlans";
import TagPill from "../components/TagPill";

function TagPlans({ setBackground }) {
  const navigate = useNavigate();
  const { tag } = useParams();
  const [loading, setLoading] = useState(true);
  const [planList, setPlanList] = useState(null);

  const tags = ["Mental", "Physical", "Education", "Other"];

  const planTag = tag && tag.charAt(0).toUpperCase() + tag.slice(1);

  const getTagPlans = () => {
    axiosInstance
      .get(`/plans/${tag}`)
      .then((res) => {
        setPlanList(res.data);
        setLoading(false);
      })
      .catch((err) => {
        return Promise.resolve(err.body);
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

  useEffect(() => {
    if (!tag || !["mental", "physical", "education", "other"].includes(tag)) {
      navigate("/404");
    } else {
      getTagPlans();
    }
  }, [tag]);

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Box sx={{ margin: "0 auto", width: "80%", flexGrow: "1" }}>
          <Box mb={theme.spacing(5)}>
            <Box pt={theme.spacing(10)}>
              <Typography variant="h3">{planTag} Plans</Typography>
              <hr
                style={{
                  width: "300px",
                  border: `2px solid ${theme.palette.primary.main}`,
                  borderRadius: "7px",
                }}
              />
            </Box>
            <Stack direction="row" gap={theme.spacing(1)}>
              {tags.map((tag, index) => (
                <TagPill tag={tag} key={index} />
              ))}
            </Stack>
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
