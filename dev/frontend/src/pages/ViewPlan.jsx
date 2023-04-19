import React, { useEffect, useContext } from "react";
import { useParams, useLocation } from "react-router-dom";
import {
  Box,
  Typography,
  Grid,
  ThemeProvider,
  IconButton,
  Stack,
} from "@mui/material";
import { theme } from "../themes/theme";
import EditIcon from "@mui/icons-material/Edit";
import UserContext from "../context/userContext";

function ViewPlan({ setBackground }) {
  const { state } = useLocation();
  const { planid } = useParams();
  const planName = state ? state.planName : null;
  const { userInfoContext } = useContext(UserContext);

  // Date info
  const currentDate = new Date();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");
  const year = String(currentDate.getFullYear());
  const formattedDate = `${month}/${day}/${year}`;

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
            <Grid container spacing="2">
              <Grid item xs={12} md={9}>
                <Stack direction="row">
                  <Typography variant="h3" sx={{ fontWeight: "500" }}>
                    {planName}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}>
                    <IconButton>
                      <EditIcon />
                    </IconButton>
                  </Box>
                </Stack>
              </Grid>
              <Grid item xs={12} md={3}>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <Typography variant="body1">
                    Created By: <b>{userInfoContext?.username}</b>
                  </Typography>
                  <Typography variant="body1">
                    Created on: <b>{formattedDate}</b>
                  </Typography>
                </Box>
              </Grid>
            </Grid>

            <Box
              mt={theme.spacing(8)}
              sx={{ display: "flex", justifyContent: "center" }}>
              <hr
                style={{
                  width: "300px",
                  border: `2px solid ${theme.palette.primary.main}`,
                  borderRadius: "7px",
                }}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default ViewPlan;
