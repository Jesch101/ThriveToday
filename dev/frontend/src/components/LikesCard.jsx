import React from "react";
import { Grid, Paper, Typography, Box } from "@mui/material";
import { theme } from "../themes/theme";

function LikesCard({ likedPlans }) {
  console.log(likedPlans);
  return (
    <Grid container spacing={theme.spacing(3)}>
      {likedPlans.map((plan, index) => {
        return (
          <Grid item xs={6} key={index}>
            <Paper elevation={3}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                }}>
                <Typography variant="body2">{plan.post_title}</Typography>
                <Typography variant="body2">{plan.date_created}</Typography>
              </Box>
            </Paper>
          </Grid>
        );
      })}
    </Grid>
  );
}

export default LikesCard;
