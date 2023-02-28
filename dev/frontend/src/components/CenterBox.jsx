import React from "react";
import { Box } from "@mui/material";

function CenterBox(props) {
  const { sx: customStyles, children } = props;
  const defaultStyles = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };
  const sx = { ...defaultStyles, ...customStyles };

  return <Box sx={sx}>{children}</Box>;
}

export default CenterBox;
