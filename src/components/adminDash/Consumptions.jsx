import React, { useEffect, useState } from "react";
import { Container, Typography, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import Moment from "moment";

import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import CardHeader from "@mui/material/CardHeader";

const columns = [
  { field: "meter_id", headerName: "Meter", width: 90 },
  {
    field: "createdAt",
    headerName: "Date",
    width: 150,
    editable: false,
  },
  {
    field: "reading",
    headerName: "Reading",
    width: 150,
    editable: false,
    valueGetter: (params) => {
      return params.row.meter.location;
    },
  },
  {
    field: "consday",
    headerName: "kWh/Day",
    // type: "number",
    width: 110,
  },
  {
    field: "estimated",
    headerName: "Estimado",
    // description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    // editable: true,
  },
];

const Consumptions = () => {
  const [consumptions, setConsumptions] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/getConsumptions")
      .then((data) => {
        console.log(data.data.rows);
        setConsumptions(data.data.rows);
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
        Consumptions{" "}
      </Typography>

      {consumptions.map((consumption) => {
        // console.log(employee);
        return (
          <Card key={Math.random()} elevation={2}>
            <Box>
              <CardHeader title={`Medidor ${consumption.location}`} />
              <Typography>{`Ultima lectura:`}</Typography>

              <Typography>{`${Moment(consumption.createdAt).format(
                "lll"
              )}`}</Typography>
              <Typography>{`kW ${consumption.reading.toLocaleString()}`}</Typography>
              <Typography>{`kWh/Dia ${consumption.consday.toFixed(
                2
              )}`}</Typography>
              <Typography>{`Estimado al dia ${Math.round(
                consumption.estimated
              ).toLocaleString()}`}</Typography>
            </Box>
          </Card>
        );
      })}

      {/* <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          id={Math.random()}
          rows={consumptions}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          disableSelectionOnClick
        />
      </div> */}
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

export default Consumptions;
