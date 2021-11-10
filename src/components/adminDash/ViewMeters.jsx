import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Container, Typography, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "meter_id",
    headerName: "Meter Number",
    width: 150,
    editable: false,
  },
  {
    field: "meter",
    headerName: "Location",
    width: 150,
    editable: false,
    valueGetter: (params) => {
      return params.row.meter.location;
    },
  },
  {
    field: "reading",
    headerName: "kWh",
    type: "number",
    width: 110,
  },
  {
    field: "notes",
    headerName: "Notes",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    editable: true,
  },
  {
    field: "username",
    headerName: "User Name",
    width: 150,
    valueGetter: (params) => {
      return params.row.employee.username;
    },
  },
];

const ViewMeters = () => {
  const [readings, setReadings] = useState([]);
  const history = useHistory();

  useEffect(() => {
    axios
      .get("/getMeterData")
      .then((data) => {
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
        onClick={() => {
          history.push("/admin/adminDash");
        }}
      >
        Back to Dashboard
      </Button>
    </Container>
  );
};

export default ViewMeters;
