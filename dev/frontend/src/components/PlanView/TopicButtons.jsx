import React, { useState } from "react";
import {
  ButtonGroup,
  Tooltip,
  Button,
  Snackbar,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import EditIcon from "@mui/icons-material/Edit";
import ChangePlanContentDialog from "./ChangePlanContentDialog";
import axiosInstance from "../../axios";
import CloseIcon from "@mui/icons-material/Close";

function TopicButtons({ index, info }) {
  const [open, setOpen] = useState(false);
  const [action, setAction] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  const handleEdit = () => {
    setAction("edit");
    setOpen(true);
  };

  const handleDelete = () => {
    const del = window.confirm("Are you sure you want to delete this topic?");
    if (del) {
      axiosInstance
        .delete(`/plans/${info.postid}/${info.topicid}`)
        .then((res) => {
          window.location.reload();
          setSnackbarMessage("Topic deleted");
          setSnackbarOpen(true);
        })
        .catch((err) => {
          Promise.resolve(err.response);
          setSnackbarMessage("Error deleting topic");
          setSnackbarOpen(true);
        });
    }
  };

  const handleAdd = () => {
    setAction("add");
    setOpen(true);
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
      <ButtonGroup variant="outlined" size="small">
        <Tooltip title="Edit Topic Content">
          <Button disableRipple size="small" onClick={handleEdit}>
            <EditIcon />
          </Button>
        </Tooltip>
        <Tooltip title="Add Subtopic">
          <Button disableRipple size="small" onClick={handleAdd}>
            <AddIcon />
          </Button>
        </Tooltip>
        <Tooltip title="Delete topic">
          <Button disableRipple size="small" onClick={handleDelete}>
            <RemoveIcon />
          </Button>
        </Tooltip>
      </ButtonGroup>
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

export default TopicButtons;
