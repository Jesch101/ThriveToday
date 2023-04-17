import React from "react";
import { Typography, Paper } from "@mui/material";

function LikeIndicator({ likes }) {
  return (
    <Paper
      elevation={2}
      sx={{
        height: "50px",
        width: "50px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}>
      <Typography variant="body2">{likes}</Typography>
      <Typography variant="body2">Likes</Typography>
    </Paper>
  );
}

export default LikeIndicator;
