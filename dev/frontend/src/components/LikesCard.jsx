import React, { useState, useEffect } from "react";
import {
  CardContent,
  Grid,
  Typography,
  styled,
  Box,
  Paper,
} from "@mui/material";
import { theme } from "../themes/theme";
import { Link } from "react-router-dom";
import CenterBox from "./CenterBox";
import axiosInstance from "../axios";

const LinkStyles = {
  color: "inherit",
  textDecoration: "none",
};

const HoverCard = styled(Paper)`
  width: 310px;
  min-height: 210px;
  border-radius: 10px;
  padding: ${theme.spacing(2)};
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  &:hover {
    cursor: pointer;
    transform: translate(0, -10px);
  }
`;

function LikesCard({ likedPlans }) {
  const [loading, setLoading] = useState(true);
  const [plansWithAuthors, setPlansWithAuthors] = useState(null);

  useEffect(() => {
    async function getAuthors() {
      const plansWithAuthorsPromises = likedPlans.map(async (plan) => {
        const response = await axiosInstance.get(`/users/${plan.userid}`);
        return {
          ...plan,
          username: response.data.username,
        };
      });
      const plansWithAuthors = await Promise.all(plansWithAuthorsPromises);
      setPlansWithAuthors(plansWithAuthors);
      setLoading(false);
    }
    getAuthors();
  }, [likedPlans]);

  if (loading) {
    return <Typography>Loading liked plans...</Typography>;
  }
  return (
    <Grid container spacing={theme.spacing(3)}>
      {plansWithAuthors.map((plan, index) => {
        return (
          <Grid item xs={6} key={index}>
            <CenterBox>
              <Link to={`/view-plan/${plan.postid}`} style={LinkStyles}>
                <HoverCard>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                    }}>
                    <Typography fontWeight="500" gutterBottom align="center">
                      {plan.post_title}
                    </Typography>
                    <Typography gutterBottom align="center">
                      Created by <b>{plan.username}</b>
                    </Typography>
                  </Box>
                </HoverCard>
              </Link>
            </CenterBox>
          </Grid>
        );
      })}
    </Grid>
  );
}

export default LikesCard;
