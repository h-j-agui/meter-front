import { Box } from "@mui/material";
import React from "react";
import { Redirect } from "react-router-dom";

const Logout = () => {
  logout = () => {
    localStorage.clear("token");
    this.setState({ navigate: true });
  };

  return <Box>Hello</Box>;
};

export default Logout;
