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

const MeterForm = () => {
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
      <Typography component="h1">Meter Form</Typography>

      <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
        <InputLabel htmlFor="outlined-adornment-password">Location</InputLabel>
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
      <FormControl>
        <InputLabel htmlFor="outlined-adornment-weight">
          Meter Reading
        </InputLabel>
        <OutlinedInput
          id="outlined-adornment-weight"
          // value={values.weight}
          type="number"
          onChange={handleChangeNum("weight")}
          endAdornment={<InputAdornment position="end">kWh</InputAdornment>}
          aria-describedby="outlined-weight-helper-text"
          inputProps={{
            "aria-label": "weight",
          }}
        />
      </FormControl>
      <FormControl>
        <TextField
          label="Notes"
          variant="outlined"
          rows={4}
          multiline
          style={{ width: "50%" }}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Add
        </Button>
        <Button type="submit" fullWidth variant="text" sx={{ mt: 3, mb: 2 }}>
          Logout
        </Button>
      </FormControl>
    </Container>
  );
};

export default MeterForm;
