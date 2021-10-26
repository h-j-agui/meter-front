import React from "react";
import axios from "axios";
import { useState } from "react";
import { FormControl, TextField, Button, Container, Box } from "@mui/material";

const Location = () => {
  const [location, setLocation] = useState("");

  const cleanStates = () => {
    setLocation("");
  };

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("starting axios post...");
    axios
      .post("http://localhost:8080/admin/addLocation", { location })
      .then((res) => {
        console.log("success", res);
      })
      .catch((err) => {
        console.log(err);
      });

    cleanStates();
  };
  return (
    <Container>
      <FormControl>
        <TextField
          id="outlined-basic"
          label="Location's Name"
          variant="outlined"
          sx={{ m: "10% auto" }}
          onChange={handleLocationChange}
        />
        <Button
          type="submit"
          fullWidth
          value={location}
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          onClick={handleSubmit}
        >
          Submit
        </Button>
        <Button
          color="primary"
          variant="text"
          size="medium"
          sx={{ margin: "10px auto" }}
          href="/admin/adminDash"
        >
          Back to Dashboard
        </Button>
      </FormControl>
    </Container>
  );
};

export default Location;