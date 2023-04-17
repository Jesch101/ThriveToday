import React from "react";
import {
  Card,
  CardContent,
  List,
  ListItemText,
  Divider,
  ListItemButton,
  ListItemIcon,
} from "@mui/material";
import LikeIndicator from "./LikeIndicator";
import { theme } from "../themes/theme";

function PlansCard({ userPlanData }) {
  return (
    <Card sx={{ width: "100%", maxWidth: "450px" }} elevation={3}>
      <CardContent sx={{ padding: theme.spacing(1) }}>
        {userPlanData
          ? userPlanData.map((plan, index) => {
              return (
                <List disablePadding key={plan.postid}>
                  <ListItemButton>
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
                  {userPlanData[index + 1] !== undefined ? <Divider /> : null}
                </List>
              );
            })
          : null}
      </CardContent>
    </Card>
  );
}

export default PlansCard;
