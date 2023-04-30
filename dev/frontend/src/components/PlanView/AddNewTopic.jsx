import React, { useState } from "react";
import { Box, Button, Snackbar, IconButton } from "@mui/material";
import ChangePlanContentDialog from "./ChangePlanContentDialog";
import CloseIcon from "@mui/icons-material/Close";

function AddNewTopic({ info }) {
  const [open, setOpen] = useState(false);
  const [action, setAction] = useState("new");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  const handleClick = () => {
    setOpen(true);
    setAction("new");
  };

  const snackbarAction = (
    <>
      <IconButton size="small" color="inherit" onClick={handleSnackbarClose}>
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );

  return (
    <>
      <Button variant="text" onClick={handleClick}>
        Add New Topic
      </Button>
      <ChangePlanContentDialog
        setSnackbarOpen={setSnackbarOpen}
        setSnackbarMessage={setSnackbarMessage}
        open={open}
        setOpen={setOpen}
        info={info}
        action={action}
      />
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
        action={snackbarAction}
      />
    </>
  );
}

export default AddNewTopic;
