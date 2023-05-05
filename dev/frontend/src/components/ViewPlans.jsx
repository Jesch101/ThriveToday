import React from "react";
import { useNavigate } from "react-router-dom";
import {
  List,
  ListItemText,
  Divider,
  ListItemButton,
  ListItemIcon,
  ListItem,
  Box,
  Badge,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { theme } from "../themes/theme";

function ViewPlans({ plans }) {
  const navigate = useNavigate();

  const handlePlanClick = (plan) => {
    navigate(`/view-plan/${plan}`);
  };

  return (
    <Box>
      <List sx={{ width: "100%" }}>
        {plans
          .sort((a, b) => b.likes - a.likes)
          .map((plan, index) => (
            <Box key={index}>
              <ListItem>
                <ListItemButton onClick={() => handlePlanClick(plan.postid)}>
                  <ListItemIcon sx={{ paddingRight: theme.spacing(3) }}>
                    <Badge badgeContent={plan.likes} color="primary" showZero>
                      <FavoriteIcon />
                    </Badge>
                  </ListItemIcon>
                  <ListItemText
                    primary={plan.post_title}
                    secondary={`Date created: ${new Date(
                      plan.date_created
                    ).toLocaleDateString()}`}
                  />
                </ListItemButton>
              </ListItem>
              {plans[index + 1] !== undefined ? <Divider /> : null}
            </Box>
          ))}
      </List>
    </Box>
  );
}

export default ViewPlans;
