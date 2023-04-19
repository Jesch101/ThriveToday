import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  ThemeProvider,
  TextField,
  Button,
} from "@mui/material";
import { theme } from "../themes/theme";
import axiosInstance from "../axios";

function CreatePlan({ setBackground }) {
  const navigate = useNavigate();

  const [newPlanName, setNewPlanName] = useState(null);

  // Date info
  const currentDate = new Date();

  const submitNewPlanName = (e) => {
    e.preventDefault();
    axiosInstance
      .post("/plans/create", {
        post_title: newPlanName,
        datecreated: currentDate,
      })
      .then((res) => {
        navigate(`/view-plan/${res.data.postid}`, {
          state: { planName: newPlanName },
        });
      })
      .catch((err) => {
        Promise.resolve(err.response);
      });
  };

  const newPlanNameChange = (e) => {
    setNewPlanName(e.target.value);
  };

  useEffect(() => {
    setBackground(true);
    return () => {
      setBackground(false);
    };
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Box sx={{ margin: "0 auto", width: "80%", flexGrow: "1" }}>
          <Box my={theme.spacing(10)}>
            <Typography variant="h3">Create a new plan</Typography>
            <form onSubmit={submitNewPlanName}>
              <TextField
                autoFocus
                margin="dense"
                label="Plan Name"
                type="text"
                fullWidth
                variant="outlined"
                onChange={newPlanNameChange}
                autoComplete="off"
                inputProps={{ maxLength: 50 }}
                required
              />
              <Button type="submit">Create</Button>
            </form>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default CreatePlan;
