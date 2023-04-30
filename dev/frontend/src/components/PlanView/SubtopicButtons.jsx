import React, { useState } from "react";
import {
  ButtonGroup,
  Tooltip,
  Button,
  Snackbar,
  IconButton,
} from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import EditIcon from "@mui/icons-material/Edit";
import ChangePlanContentDialog from "./ChangePlanContentDialog";
import CloseIcon from "@mui/icons-material/Close";
import axiosInstance from "../../axios";

function SubtopicButtons({ index, info }) {
  const [open, setOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [action, setAction] = useState("");

  const handleEdit = () => {
    setAction("edit");
    setOpen(true);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  const handleDelete = () => {
    const del = window.confirm(
      "Are you sure you want to delete this subtopic?"
    );
    if (del) {
      axiosInstance
        .delete(`/plans/${info.postid}/${info.topicid}/${info.subtopicid}`)
        .then((res) => {
          window.location.reload();
          setSnackbarMessage("Subtopic deleted");
          setSnackbarOpen(true);
        })
        .catch((err) => {
          Promise.resolve(err.response);
          setSnackbarMessage("Error deleting subtopic");
          setSnackbarOpen(true);
        });
    }
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
        <Tooltip title="Edit Content">
          <Button disableRipple size="small" onClick={handleEdit}>
            <EditIcon />
          </Button>
        </Tooltip>
        <Tooltip title="Delete Subtopic">
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

export default SubtopicButtons;
