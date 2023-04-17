import React from "react";
import { motion } from "framer-motion";
import { theme } from "../themes/theme";
import { ThemeProvider, Box } from "@mui/material";

const loadingContainer = {
  width: "3.2rem",
  height: "3.2rem",
  display: "flex",
  justifyContent: "space-around",
};

const loadingCircle = {
  display: "block",
  width: "1rem",
  height: "1rem",
  backgroundColor: "black",
  borderRadius: "0.5rem",
};

const loadingContainerVariants = {
  start: {
    transition: {
      staggerChildren: 0.2,
    },
  },
  end: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const loadingCircleVariants = {
  start: {
    y: "50%",
  },
  end: {
    y: "150%",
  },
};

const loadingCircleTransition = {
  duration: 0.5,
  repeat: Infinity,
  repeatType: "reverse",
  ease: "easeInOut",
};

function Loader() {
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          position: "absolute", // Add this to position the Loader component
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}>
        <motion.div
          style={loadingContainer}
          variants={loadingContainerVariants}
          initial="start"
          animate="end">
          <motion.span
            style={loadingCircle}
            variants={loadingCircleVariants}
            transition={loadingCircleTransition}
          />
          <motion.span
            style={loadingCircle}
            variants={loadingCircleVariants}
            transition={loadingCircleTransition}
          />
          <motion.span
            style={loadingCircle}
            variants={loadingCircleVariants}
            transition={loadingCircleTransition}
          />
        </motion.div>
      </Box>
    </ThemeProvider>
  );
}

export default Loader;
