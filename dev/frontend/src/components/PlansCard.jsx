import React from "react";
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
  const handleDelete = () => {
    const del = window.confirm("Are you sure you want to delete this plan?");
    if (del) {
      console.log("delete plan");
    }
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
                          onClick={handleDelete}>
                          <DeleteIcon fontSize="large" />
                        </IconButton>
                      }>
                      <ListItemButton role="undefined">
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
