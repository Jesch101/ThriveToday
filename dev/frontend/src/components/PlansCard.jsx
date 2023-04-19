import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  List,
  ListItemText,
  Divider,
  ListItemButton,
  ListItemIcon,
  IconButton,
  ListItem,
  Box,
} from "@mui/material";
import LikeIndicator from "./LikeIndicator";
import DeleteIcon from "@mui/icons-material/Delete";
import { theme } from "../themes/theme";
import axiosInstance from "../axios";

function PlansCard({ userPlanData }) {
  const navigate = useNavigate();

  const handleDelete = (postid) => {
    const del = window.confirm("Are you sure you want to delete this plan?");
    if (del) {
      axiosInstance
        .delete(`/plans/${postid}`)
        .then((res) => {
          window.location.reload();
        })
        .catch((err) => {
          Promise.resolve(err.response);
        });
    }
  };

  const handlePlanClick = (plan) => {
    navigate(`/view-plan/${plan}`);
  };

  return (
    <Card sx={{ width: "100%", maxWidth: "450px" }} elevation={3}>
      <CardContent sx={{ padding: theme.spacing(1) }}>
        <List sx={{ width: "100%" }}>
          {userPlanData
            ? userPlanData.map((plan, index) => {
                return (
                  <Box key={plan.postid}>
                    <ListItem
                      disablePadding
                      secondaryAction={
                        <IconButton
                          edge="end"
                          aria-label="delete"
                          size="large"
                          onClick={() => handleDelete(plan.postid)}>
                          <DeleteIcon fontSize="large" />
                        </IconButton>
                      }>
                      <ListItemButton
                        role="undefined"
                        onClick={() => handlePlanClick(plan.postid)}>
                        <ListItemIcon sx={{ paddingRight: theme.spacing(3) }}>
                          <LikeIndicator likes={plan.likes} />
                        </ListItemIcon>
                        <ListItemText
                          primary={plan.post_title}
                          secondary={`Date created: ${new Date(
                            plan.date_created
                          ).toLocaleDateString()}`}
                        />
                      </ListItemButton>
                    </ListItem>
                    {userPlanData[index + 1] !== undefined ? <Divider /> : null}
                  </Box>
                );
              })
            : null}
        </List>
      </CardContent>
    </Card>
  );
}

export default PlansCard;
