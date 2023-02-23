import React from "react";
import { Box, Typography, ThemeProvider, Button } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import CenterBox from "../components/CenterBox";
import theme from "../themes/theme";

function Home() {
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          margin: "0 auto",
          width: "80%",
          flexGrow: "1",
        }}
        pt={theme.spacing(10)}>
        <Grid container spacing="2">
          <Grid xs={12} md={6}>
            <Box>
              <Box>
                <Typography
                  sx={{
                    fontWeight: "semibold",
                    fontSize: "58px",
                    lineHeight: "1",
                  }}>
                  Transform Your Health and Wellness Journey
                </Typography>
              </Box>
              <Box pt={theme.spacing(4)}>
                <Typography sx={{ fontWeight: "medium", fontSize: "22px" }}>
                  Create custom plans, share your own tips and techniques, and
                  explore a supportive community dedicated to a healthier
                  lifestyle.
                </Typography>
              </Box>
              <Box pt={theme.spacing(4)}>
                <Button variant="contained" size="large">
                  Get Started
                </Button>
              </Box>
            </Box>
          </Grid>
          <Grid xs={12} md={6}>
            <CenterBox></CenterBox>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
}

export default Home;
