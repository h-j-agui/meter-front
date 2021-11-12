import React, { useContext, useState } from "react";
import axios from "axios";
import { useHistory, Redirect } from "react-router-dom";
import { LoginContext } from "../../utils/Context";
// import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

export default function Dashboard() {
  const { loggedIn, setLoggedIn } = useContext(LoginContext);
  const history = useHistory();

  const handleLogout = (req, res) => {
    axios
      .get("http://localhost:8080/logout", {
        withCredentials: true,
      })
      .then(() => {
        setLoggedIn(null);
        history.push("/");
      });
  };
  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      {/* <Stack spacing={2} sx={{ width: "20%", justifyContent: "center" }}> */}
      <Button
        variant="contained"
        size="medium"
        sx={{ width: "25%", margin: "15px auto 0" }}
        color="secondary"
        onClick={() => {
          history.push("/addEmployee");
        }}
      >
        Add Employee
      </Button>

      <Button
        color="success"
        variant="contained"
        size="medium"
        sx={{ width: "25%", margin: "15px auto" }}
        onClick={() => {
          history.push("/addAdministrator");
        }}
      >
        Add Administrator
      </Button>
      <Button
        variant="contained"
        size="medium"
        sx={{ width: "25%", margin: "0 auto 15px" }}
        onClick={() => {
          history.push("/addLocation");
        }}
      >
        Add Meter Location
      </Button>

      <Button
        variant="contained"
        size="medium"
        sx={{ width: "25%", margin: "0 auto 15px" }}
        color="error"
        onClick={() => {
          history.push("/viewMeters");
        }}
      >
        View Meter Data
      </Button>
      <Button
        color="secondary"
        variant="contained"
        size="medium"
        sx={{ width: "25%", margin: "0 auto 15px" }}
        onClick={() => {
          history.push("/viewEmployees");
        }}
      >
        View Employees
      </Button>
      <Button
        variant="text"
        size="medium"
        sx={{ width: "25%", margin: "auto" }}
        onClick={handleLogout}
      >
        Logout
      </Button>
      <Button
        variant="text"
        size="medium"
        sx={{ width: "25%", margin: "auto" }}
        onClick={() => {
          console.log(loggedIn);
        }}
      >
        check Logged In
      </Button>
      {/* </Stack> */}
    </Box>
  );
}
