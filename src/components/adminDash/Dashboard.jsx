import React, { useContext, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { LoginContext } from "../../utils/Context";
// import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

export default function Dashboard() {
  const { loggedIn, setLoggedIn } = useContext(LoginContext);
  const history = useHistory();

  console.log("loggedin inside admindash is", loggedIn);
  const handleLogout = (req, res, next) => {
    axios
      .get("http://localhost:8080/logout", {
        withCredentials: true,
      })
      .then(() => {
        setLoggedIn("");
        history.push("/");
      });
  };
  return loggedIn ? (
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
        href="/addEmployee"
      >
        Add Employee
      </Button>

      <Button
        color="success"
        variant="contained"
        size="medium"
        sx={{ width: "25%", margin: "15px auto" }}
        href="/addAdministrator"
      >
        Add Administrator
      </Button>
      <Button
        variant="contained"
        size="medium"
        sx={{ width: "25%", margin: "0 auto 15px" }}
        href="/addLocation"
      >
        Add Meter Location
      </Button>

      <Button
        variant="contained"
        size="medium"
        sx={{ width: "25%", margin: "0 auto 15px" }}
        color="error"
        href="/viewMeters"
      >
        View Meter Data
      </Button>
      <Button
        color="secondary"
        variant="contained"
        size="medium"
        sx={{ width: "25%", margin: "0 auto 15px" }}
        href="/viewEmployees"
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
      {/* </Stack> */}
    </Box>
  ) : (
    <div>Not Authorized</div>
  );
}
