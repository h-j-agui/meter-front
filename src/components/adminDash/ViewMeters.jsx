import React, { useEffect, useState } from "react";
import { Container, Typography, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "meter_id",
    headerName: "Meter Number",
    width: 150,
    editable: true,
  },
  {
    field: "reading",
    headerName: "kWh",
    type: "number",
    width: 110,
    editable: true,
  },
  {
    field: "notes",
    headerName: "Notes",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
  },
  {
    field: "username",
    headerName: "User Name",
    width: 150,
    editable: true,
  },
];

const rows = [
  { id: 1, location: "Jon", reading: 35, notes: "hello", username: "Snow" },
];

const ViewMeters = () => {
  const [readings, setReadings] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/getMeterData")
      .then((data) => {
        console.log(data);
        setReadings(data.data);
      })

      .catch((err) => console.log(err));
  }, []);

  return (
    <Container>
      <Typography
        component="h1"
        variant="h5"
        color="primary"
        sx={{ m: "15px auto" }}
      >
        Meter Reading List
      </Typography>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={readings}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          disableSelectionOnClick
        />
      </div>
      <Button
        color="primary"
        variant="text"
        size="medium"
        sx={{ margin: "10px auto" }}
        href="/admin/adminDash"
      >
        Back to Dashboard
      </Button>
    </Container>
  );
};

export default ViewMeters;
