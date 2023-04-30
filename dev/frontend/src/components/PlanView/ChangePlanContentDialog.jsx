import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Button,
} from "@mui/material";
import axiosInstance from "../../axios";

function ChangePlanContentDialog({
  info,
  action,
  open,
  setOpen,
  setSnackbarOpen,
  setSnackbarMessage,
}) {
  const [content, setContent] = useState(
    action === "edit" ? info?.topic_title ?? info?.subtopic_title ?? null : ""
  );
  const [title, setTitle] = useState(
    action === "edit" ? info?.topic_title ?? info?.subtopic_title ?? null : ""
  );

  useEffect(() => {
    setContent(action === "edit" ? info?.content : "");
    setTitle(
      action === "edit" ? info?.topic_title ?? info?.subtopic_title ?? null : ""
    );
  }, [action]);

  const handleCancel = () => {
    setContent(action === "add" ? "" : info?.content);
    setTitle(
      action === "add" ? "" : info?.topic_title || info?.subtopic_title || null
    );
    setOpen(false);
  };

  const handleSubmit = () => {
    setOpen(false);
    if (action === "edit") {
      if (info?.topic_title) {
        axiosInstance
          .patch(
            `/plans/${info.postid}/${info.topicid}/${info.subtopicid}/edit`,
            {
              subtopic_title: title,
              content: content,
            }
          )
          .then((res) => {
            window.location.reload();
            setSnackbarMessage("Subtopic edited");
            setSnackbarOpen(true);
          })
          .catch((err) => {
            Promise.resolve(err.response);
            setSnackbarMessage("Error editing subtopic");
            setSnackbarOpen(true);
          });
      } else if (info?.subtopic_title) {
        axiosInstance
          .patch(
            `/plans/${info.postid}/${info.topicid}/${info.subtopicid}/edit`,
            {
              subtopic_title: title,
              content: content,
            }
          )
          .then((res) => {
            window.location.reload();
            setSnackbarMessage("Subtopic edited");
            setSnackbarOpen(true);
          })
          .catch((err) => {
            Promise.resolve(err.response);
            setSnackbarMessage("Error editing subtopic");
            setSnackbarOpen(true);
          });
      }
    } else if (action === "add") {
      axiosInstance
        .post(`/plans/create/${info.postid}/${info.topicid}`, {
          subtopic_title: title,
          content: content,
        })
        .then((res) => {
          window.location.reload();
          setSnackbarMessage("Subtopic added");
          setSnackbarOpen(true);
        })
        .catch((err) => {
          Promise.resolve(err.response);
          setSnackbarMessage("Error adding subtopic");
          setSnackbarOpen(true);
        });
    } else if (action === "new") {
      axiosInstance
        .post(`/plans/create/${info.postid}`, {
          topic_title: title,
          content: content,
        })
        .then((res) => {
          window.location.reload();
          setSnackbarMessage("Topic added");
          setSnackbarOpen(true);
        })
        .catch((err) => {
          Promise.resolve(err.response);
          setSnackbarMessage("Error adding topic");
          setSnackbarOpen(true);
        });
    }
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
      <DialogTitle>
        <TextField
          autoFocus
          margin="dense"
          fullWidth
          variant="standard"
          value={title}
          placeholder={"Enter Title"}
          onChange={handleTitleChange}
        />
      </DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          fullWidth
          variant="standard"
          multiline
          value={content}
          placeholder={"Enter Content"}
          onChange={handleContentChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel}>Cancel</Button>
        <Button onClick={handleSubmit}>Submit</Button>
      </DialogActions>
    </Dialog>
  );
}

export default ChangePlanContentDialog;
