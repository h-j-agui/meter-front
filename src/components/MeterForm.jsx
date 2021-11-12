import React, { useContext, useState, useEffect } from "react";
import { LoginContext } from "../utils/Context";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Moment from "moment";
import {
  Container,
  Typography,
  InputLabel,
  FormControl,
  TextField,
  bottomNavigationClasses,
  Select,
  MenuItem,
  InputAdornment,
  OutlinedInput,
  Button,
  Box,
} from "@mui/material";

import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  root: { marginTop: "20px" },
  title: { marginBottom: "20px" },
  input: {},
  submit: {
    marginTop: "20px",
  },
});

const MeterForm = () => {
  const { loggedIn, setLoggedIn } = useContext(LoginContext);
  const [isPending, setIsPending] = useState(true);
  console.log("meter", loggedIn);
  const classes = useStyles();
  const history = useHistory();

  //Storing form inputs
  const [meter, setMeter] = useState("");
  const [number, setNumber] = useState("");
  const [note, setNote] = useState("");

  const [lastReadings, setLastReadings] = useState([]);
  const [displayReading, setDisplayReading] = useState("");
  const [meterList, setMeterList] = useState([]);

  useEffect(() => {
    //Fetching meters for selector

    axios
      .get("http://localhost:8080/admin/getMeters")
      .then((data) => {
        setMeterList(data.data);
        setIsPending(false);
      })
      .catch((err) => {
        console.log(err);
      });

    //Fetching last record of each meter
    axios
      .get("http://localhost:8080/getLastReadings")
      .then((data) => {
        setLastReadings(data.data.rows);
      })
      .catch((err) => console.log(err));
  }, [displayReading]);

  const handleCheck = () => {
    axios
      .get("/checkAuth")
      .then((response) => {
        console.log(response);
      })
      .catch((err) => console.log(err));
  };

  const cleanStates = () => {
    setNumber("");
    setMeter("");
    setNote("");
    setDisplayReading("");
    setLastReadings([]);
  };

  const handleMeterChange = (event) => {
    lastReadings.forEach((element) => {
      if (element.meter_id == event.target.value) {
        setDisplayReading(element);
      }
    });

    setMeter(event.target.value);
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

    if (number <= displayReading.reading) {
      alert("Error, check the meter number again");
    } else {
      axios
        .post("http://localhost:8080/editMeterData", {
          meter_id: meter,
          reading: number,
          notes: note,
          user_id: loggedIn.id,
        })
        .then((res) => {
          console.log("success", res);
        })
        .catch((err) => {
          console.log(err);
        });
      cleanStates();
    }
  };

  const handleLogout = (req, res, next) => {
    axios
      .get("http://localhost:8080/logout", {
        withCredentials: true,
      })
      .then(() => {
        setLoggedIn(null);
        history.push("/");
      });
  };

  return isPending == true ? (
    <Box sx={{ mt: 10, fontSize: 22 }}>Loading...</Box>
  ) : (
    <Container component="main">
      <Box className={classes.root}>
        <Box className={classes.title}>
          <Typography component="h1">Meter Form</Typography>
          <Typography component="h1">{loggedIn.username}</Typography>
        </Box>
        <Box className={classes.input}>
          <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              Location
            </InputLabel>
            <Select
              labelId="outlined-adornment-password"
              id="outlined-adornment-password"
              value={meter}
              label="Location"
              onChange={handleMeterChange}
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

        {displayReading ? (
          <Box>
            <Typography
              sx={{ fontStyle: "italic" }}
            >{`Latest entry for this location is ${displayReading.reading} kWh on`}</Typography>

            {/* <Box>{`on date ${displayReading.createdAt}`}</Box> */}
            <Typography sx={{ fontStyle: "italic" }}>
              {Moment(displayReading.createdAt).format("LLL")}
            </Typography>
          </Box>
        ) : (
          <Box></Box>
        )}

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
        <Button
          variant="text"
          size="medium"
          sx={{ width: "25%", margin: "10PX auto" }}
          onClick={handleLogout}
        >
          Logout
        </Button>
        <Button onClick={handleCheck}>checkauth</Button>
      </Box>
    </Container>
  );
};

export default MeterForm;
