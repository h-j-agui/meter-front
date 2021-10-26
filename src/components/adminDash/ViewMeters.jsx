import React, { useEffect, useState } from "react";
import { Container, Typography, Button } from "@mui/material";

const ViewMeters = () => {
  const [meter, setMeter] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/admin/meter")
      .then((res) => res.json())
      .then((data) => setMeter(data));
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
