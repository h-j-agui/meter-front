import React from "react";
import axios from "axios";
import {
  Container,
  Typography,
  InputLabel,
  FormControl,
  TextField,
} from "@mui/material";
import {
  Select,
  MenuItem,
  InputAdornment,
  OutlinedInput,
  Button,
} from "@mui/material";

import { makeStyles } from "@mui/styles";
import Box from "@mui/material/Box";
import { useState, useEffect } from "react";

const useStyles = makeStyles({
  root: { marginTop: "20px" },
  title: { marginBottom: "20px" },
  input: {},
  submit: {
    marginTop: "20px",
  },
});

const MeterForm = () => {
  const classes = useStyles();
  const [number, setNumber] = useState("");
  const [place, setPlace] = useState("");
  const [note, setNote] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8080/admin/getMeters")
      .then((data) => {
        console.log(data.data);
        setMeterList(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const [meterList, setMeterList] = useState([]);

  const cleanStates = () => {
    setNumber("");
    setPlace("");
    setNote("");
  };

  const handlePlaceChange = (event) => {
    console.log(event.target.value);
    setPlace(event.target.value);
  };

  const handleNumChange = (e) => {
    setNumber(e.target.value);
    console.log("kWh");
  };
  const handleNotesChange = (e) => {
    setNote(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("starting axios post...");
    axios
      .post("http://localhost:8080/form", {
        place: place,
        reading: number,
        notes: note,
      })
      .then((res) => {
        console.log("success", res);
      })
      .catch((err) => {
        console.log(err);
      });

    cleanStates();
  };

  return (
    <Container component="main">
      <Box className={classes.root}>
        <Box className={classes.title}>
          <Typography component="h1">Meter Form</Typography>
        </Box>
        <Box className={classes.input}>
          <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              Location
            </InputLabel>
            <Select
              labelId="outlined-adornment-password"
              id="outlined-adornment-password"
              value={place}
              label="Location"
              onChange={handlePlaceChange}
            >
              {meterList.map((e) => {
                return (
                  <MenuItem key={e.id} value={e.id}>
                    {e.location}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Box>
        <Box className={classes.input}>
          <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
            <TextField
              id="outlined-number"
              variant="outlined"
              label="Number"
              type="number"
              value={number}
              onChange={handleNumChange}
            />
          </FormControl>
        </Box>
        <Box className={classes.input}>
          <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
            <TextField
              label="Notes"
              variant="outlined"
              rows={4}
              multiline
              value={note}
              style={{ width: "100%" }}
              onChange={handleNotesChange}
            />
          </FormControl>
        </Box>
        <Box className={classes.submit}>
          <Button
            type="submit"
            variant="contained"
            style={{ width: "250px" }}
            onClick={handleSubmit}
          >
            Add
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default MeterForm;
