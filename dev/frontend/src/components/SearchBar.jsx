import React, { useState, useEffect } from "react";
import {
  Button,
  DialogActions,
  Dialog,
  InputAdornment,
  DialogContent,
  FormControl,
  Input,
  DialogTitle,
  DialogContentText,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import axiosInstance from "../axios";
import { theme } from "../themes/theme";
import { useNavigate } from "react-router-dom";

function ContentText({ searchResults, setSelectedResult }) {
  return (
    <>
      {searchResults.map((result) => (
        <DialogContentText
          key={result.postid}
          px={theme.spacing(1)}
          sx={{
            cursor: "pointer",
            "&:hover": {
              backgroundColor: "#e0e0e0",
              color: "black",
            },
          }}
          onClick={() => setSelectedResult(result.postid)}>
          {result.post_title}
        </DialogContentText>
      ))}
    </>
  );
}

function SearchBar() {
  const [dialogActive, setDialogActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [term, setTerm] = useState(null);
  const [searchResults, setSearchResults] = useState(null);
  const [selectedResult, setSelectedResult] = useState(null);
  const navigate = useNavigate();

  const handleOpen = () => {
    setDialogActive(true);
    setSearchResults(null);
    setTerm(null);
  };

  const handleClose = () => {
    setDialogActive(false);
    setSearchResults(null);
    setTerm(null);
  };

  const handleSubmit = () => {
    if (term !== null) {
      setLoading(true);
      axiosInstance
        .get(`/plans/search?term=${term}`)
        .then((res) => {
          let results = res.data;
          setSearchResults(results ? results : "No results found");
          setLoading(false);
        })
        .catch((err) => {
          Promise.resolve(err.response);
          setLoading(false);
          setSearchResults("Error with search.");
        });
    }
    setSearchResults(null);
  };

  useEffect(() => {
    if (selectedResult !== null) {
      navigate(`/view-plan/${selectedResult}`);
      handleClose();
    }
  }, [selectedResult]);

  return (
    <>
      <Button
        sx={{ minWidth: "130px", height: "34px" }}
        disableRipple
        variant="outlined"
        onClick={handleOpen}>
        <SearchIcon fontSize="small" />
        <span style={{ marginLeft: "8px", marginRight: "auto" }}>
          Search...
        </span>
      </Button>
      <Dialog open={dialogActive} maxWidth="md" onClose={handleClose} fullWidth>
        <DialogTitle>Search For Plans</DialogTitle>
        <DialogContent>
          <FormControl
            variant="standard"
            fullWidth
            sx={{ paddingBottom: theme.spacing(2) }}>
            <Input
              id="search-input"
              autoFocus
              fullWidth
              onSubmit={handleSubmit}
              startAdornment={
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              }
              onChange={(e) => setTerm(e.target.value)}
            />
          </FormControl>
          {searchResults !== null && !loading && (
            <ContentText
              searchResults={searchResults}
              setSelectedResult={setSelectedResult}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={handleSubmit}>Search</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default SearchBar;
