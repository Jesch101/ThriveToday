import React from "react";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { theme } from "../themes/theme";

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

function TagPill({ tag }) {
  const link = tagColor(tag)[1];
  return (
    <Link to={link} style={LinkStyles}>
      <Box
        mt={theme.spacing(1)}
        sx={{
          border: "2px solid",
          borderColor: `${tagColor(tag)[0]}`,
          backgroundColor: `${tagColor(tag)[0]}`,
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
          {tag}
        </Typography>
      </Box>
    </Link>
  );
}

export default TagPill;
