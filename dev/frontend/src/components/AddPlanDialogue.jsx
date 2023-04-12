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
} from "@mui/material";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function AddPlanDialogue() {
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
        sx={{ height: "35px" }}
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
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Submit</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default AddPlanDialogue;
