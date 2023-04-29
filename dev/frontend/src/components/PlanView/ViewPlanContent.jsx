import React from "react";
import { theme } from "../../themes/theme";
import { Box, ThemeProvider, Button, ButtonGroup, Stack } from "@mui/material";
import axiosInstance from "../../axios";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import EditIcon from "@mui/icons-material/Edit";

const Buttons = () => (
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
);

function ViewPlanContent({ planData }) {
  const addTopic = () => {
    axiosInstance
      .post(`/plans/create/${planData.postid}/8`, {
        subtopic_title: "New Sub Topic",
        content: "New Sub Topic Content",
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
      <Stack direction="column" gap={theme.spacing(2)}>
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
      </Stack>
    </ThemeProvider>
  );
}

export default ViewPlanContent;
