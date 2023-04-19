import React, { forwardRef, useState } from "react";
import {
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Box,
  Slide,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { theme } from "../themes/theme";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function AddPlanDialogue({
  handleSubmit,
  handleChange,
  handlePlanTagChange,
  planTag,
}) {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box>
      <Button
        variant="contained"
        size="medium"
        sx={{ height: "35px", borderRadius: "25px" }}
        disableElevation
        onClick={handleClickOpen}>
        Add Plan
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
        keepMounted>
        <DialogTitle>New Plan</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To make a new plan, please provide a name to describe it. You can
            edit this later.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Plan Name"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleChange}
            autoComplete="off"
            inputProps={{ maxLength: 50 }}
            required
            sx={{ paddingBottom: theme.spacing(2) }}
          />
          <FormControl>
            <InputLabel>Plan Tag</InputLabel>
            <Select
              value={planTag}
              label="Plan Tag"
              onChange={handlePlanTagChange}>
              <MenuItem value="Mental">Mental</MenuItem>
              <MenuItem value="Education">Education</MenuItem>
              <MenuItem value="Physical">Physical</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default AddPlanDialogue;
