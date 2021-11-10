import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import {
  FormControl,
  TextField,
  Button,
  Typography,
  Container,
} from "@mui/material";
import { LoginContext } from "../../utils/Context";

import { useState } from "react";
import cleanName from "../../utils/fnCleanNames";

const AddEmployee = () => {
  const [name, setName] = useState("");
  const [pin, setPin] = useState("");
  const { loggedIn, setLoggedIn } = useContext(LoginContext);
  const history = useHistory();

  const cleanStates = () => {
    setName("");
    setPin("");
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handlePinChange = (e) => {
    setPin(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("starting axios post...");
    axios
      .post("/admin/addUser", {
        username: cleanName,
        password: pin,
      })
      .then((res) => {
        console.log("success", res);
        // console.log("name", name, "pin", pin);
      })
      .catch((err) => {
        console.log(err);
      });

    cleanStates();
  };

  // setTimeout(() => {
  //   console.log("timeout 5 seconds", loggedIn);
  // }, 5000);

  return (
    <Container>
      <FormControl>
        <Typography
          component="h1"
          variant="h5"
          color="secondary"
          sx={{ m: "10% auto" }}
        >
          New Employee
        </Typography>
        <TextField
          id="outlined-basic"
          label="Name"
          variant="outlined"
          sx={{ m: "10% auto" }}
          value={name}
          onChange={handleNameChange}
        />

        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Pin Number"
          type="password"
          id="password"
          value={pin}
          autoComplete="current-password"
          inputProps={{ maxLength: 4 }}
          onChange={handlePinChange}
        />
        <Button
          color="secondary"
          type="submit"
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          onClick={handleSubmit}
        >
          Add Employee
        </Button>
        <Button
          color="secondary"
          variant="text"
          size="medium"
          sx={{ margin: "10px auto" }}
          onClick={() => {
            history.push("/viewEmployees");
          }}
        >
          View Employees
        </Button>
        <Button
          color="secondary"
          variant="text"
          size="medium"
          sx={{ margin: "10px auto" }}
          onClick={() => {
            history.push("/admin/adminDash");
          }}
        >
          Back to Dashboard
        </Button>
      </FormControl>
    </Container>
  );
};

export default AddEmployee;
