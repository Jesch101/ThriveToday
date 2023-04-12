import React, { useEffect, useState } from "react";
import theme from "../themes/theme";
import { Box, ThemeProvider, Typography, Fade } from "@mui/material";

function About() {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    setIsVisible(true);
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Box
          sx={{ margin: "0 auto", width: "80%", flexGrow: "1" }}
          pt={theme.spacing(10)}>
          <Typography variant="h3">About us!</Typography>
          <hr
            style={{
              width: "300px",
              border: `2px solid ${theme.palette.primary.main}`,
              borderRadius: "7px",
            }}
          />
        </Box>
        <Box sx={{ margin: "0 auto", width: "85%" }}>
          <Fade
            in={isVisible}
            timeout={1500}
            style={{ transitionDelay: "100ms" }}>
            <Typography my={theme.spacing(4)} variant="body1">
              Welcome to our health and wellness website, where we believe that
              everyone deserves the opportunity to live their healthiest and
              happiest life. Our mission is to provide you with the tools and
              support you need to transform your health and wellness journey.
            </Typography>
          </Fade>
          <Fade
            in={isVisible}
            timeout={2000}
            style={{ transitionDelay: "200ms" }}>
            <Typography my={theme.spacing(4)} variant="body1">
              At our website, you can create custom plans that cater to your
              unique needs and preferences. Whether you're focused on improving
              your physical health, boosting your mental well-being, or
              enhancing your academic performance, we have you covered. Our
              three columns of wellness plan building offer a comprehensive
              approach to health and wellness that addresses all aspects of your
              life.
            </Typography>
          </Fade>
          <Fade
            in={isVisible}
            timeout={2500}
            style={{ transitionDelay: "300ms" }}>
            <Typography my={theme.spacing(4)} variant="body1">
              We believe that health and wellness is a journey, and we're here
              to support you every step of the way. That's why we've built a
              community of like-minded individuals who are all dedicated to
              living a healthier lifestyle. You can share your own tips and
              techniques, connect with others who share your goals, and find the
              motivation you need to stay on track.
            </Typography>
          </Fade>
          <Fade
            in={isVisible}
            timeout={3000}
            style={{ transitionDelay: "700ms" }}>
            <Typography my={theme.spacing(4)} variant="body1">
              Thank you for choosing our website as your partner in your health
              and wellness journey. We look forward to helping you achieve your
              goals and live your best life!
            </Typography>
          </Fade>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default About;
