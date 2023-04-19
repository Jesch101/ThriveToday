import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  ThemeProvider,
  TextField,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";
import { theme } from "../themes/theme";
import axiosInstance from "../axios";

function CreatePlan({ setBackground }) {
  const navigate = useNavigate();

  const [newPlanName, setNewPlanName] = useState(null);
  const [planTag, setPlanTag] = useState("Other");

  const currentDate = new Date().toISOString();

  const submitNewPlanName = (e) => {
    e.preventDefault();
    axiosInstance
      .post("/plans/create", {
        post_title: newPlanName,
        date_created: currentDate,
        tag: planTag,
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

  const newPlanTagChange = (e) => {
    setPlanTag(e.target.value);
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
              <Stack spacing={2} sx={{ maxWidth: "500px" }}>
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
                <FormControl>
                  <InputLabel>Plan Tag</InputLabel>
                  <Select
                    value={planTag}
                    label="Plan Tag"
                    onChange={newPlanTagChange}>
                    <MenuItem value="Mental">Mental</MenuItem>
                    <MenuItem value="Education">Education</MenuItem>
                    <MenuItem value="Physical">Physical</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                  </Select>
                </FormControl>
                <Button type="submit" variant="contained" size="large">
                  Create
                </Button>
              </Stack>
            </form>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default CreatePlan;
