import * as React from "react";
// import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

const handleLogout = () => {
  alert("logout");
};

export default function Dashboard() {
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
  );
}
