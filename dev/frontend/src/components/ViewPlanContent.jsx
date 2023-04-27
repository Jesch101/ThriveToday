import React from "react";
import { theme } from "../themes/theme";
import { Box, ThemeProvider, Button, ButtonGroup } from "@mui/material";
import axiosInstance from "../axios";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import EditIcon from "@mui/icons-material/Edit";

function ViewPlanContent({ planData }) {
  const addTopic = () => {
    axiosInstance
      .post(`/plans/create/${planData.postid}`, {
        topic_title: "New Topic",
        content: "New Topic Content",
      })
      .then((res) => {
        console.log("Success");
      })
      .catch((err) => {
        Promise.resolve(err.response);
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <ButtonGroup variant="outlined" size="small">
        <Button disableRipple>
          <EditIcon />
        </Button>
        <Button disableRipple>
          <AddIcon />
        </Button>
        <Button disableRipple>
          <RemoveIcon />
        </Button>
      </ButtonGroup>
    </ThemeProvider>
  );
}

export default ViewPlanContent;
