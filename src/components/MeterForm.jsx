import React from "react";
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
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const handleChangeNum = (prop) => (event) => {
    // setValues({ ...values, [prop]: event.target.value });
    console.log("kWh");
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
              value={age}
              label="Age"
              onChange={handleChange}
            >
              <MenuItem value={1}>Sabin</MenuItem>
              <MenuItem value={2}>Sarmiento</MenuItem>
              <MenuItem value={3}>Hirigoyen</MenuItem>
              <MenuItem value={4}>Las Heras</MenuItem>
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
              style={{ width: "100%" }}
            />
          </FormControl>
        </Box>
        <Box className={classes.submit}>
          <Button type="submit" variant="contained" style={{ width: "250px" }}>
            Add
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default MeterForm;
