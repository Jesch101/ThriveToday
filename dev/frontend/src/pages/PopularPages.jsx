import React, { useEffect, useState } from "react";
import { ThemeProvider, Box, Typography, Stack } from "@mui/material";
import { theme } from "../themes/theme";
import axiosInstance from "../axios";
import Loader from "../components/Loader";
import TagPill from "../components/TagPill";
import ViewPlans from "../components/ViewPlans";

function PopularPages({ setBackground }) {
  const [loading, setLoading] = useState(true);
  const [popularPlans, setPopularPlans] = useState(null);

  const tags = ["Mental", "Physical", "Education", "Other"];

  const getPopularPlans = () => {
    axiosInstance
      .get(`/plans/top-plans`)
      .then((res) => {
        setPopularPlans(res.data);
      })
      .catch((err) => {
        Promise.resolve(err.response);
      })
      .then(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getPopularPlans();
    setBackground(true);
    return () => {
      setBackground(false);
    };
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}>
        <Box
          sx={{ margin: "0 auto", width: "80%", flexGrow: "1" }}
          pt={theme.spacing(10)}>
          <Typography variant="h3">Popular Plans</Typography>
          <hr
            style={{
              width: "300px",
              border: `2px solid ${theme.palette.primary.main}`,
              borderRadius: "7px",
            }}
          />
          <Stack direction="row" gap={theme.spacing(1)}>
            {tags.map((tag, index) => (
              <TagPill tag={tag} key={index} />
            ))}
          </Stack>
          <Box my={theme.spacing(4)}>
            {loading ? (
              <Loader />
            ) : (
              <>
                <ViewPlans plans={popularPlans} />
              </>
            )}
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default PopularPages;
