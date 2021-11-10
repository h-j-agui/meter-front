import React, { useState } from "react";
import { FormControl, TextField, Button, Typography } from "@mui/material";
import axios from "axios";
import { useHistory } from "react-router-dom";
import cleanName from "../../utils/fnCleanNames";

const Administrator = () => {
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");
  const history = useHistory();

  const cleanStates = () => {
    setName("");
    setPass("");
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handlePassChange = (e) => {
    setPass(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("starting axios post...");
    axios
      .post("http://localhost:8080/admin/addAdmin", {
        username: cleanName,
        password: pass,
      })
      // .then((res) => {
      // console.log("success", res);
      // console.log("name", name, "password", pass);
      // })
      .catch((err) => {
        console.log(err);
      });

    cleanStates();
  };

  return (
    <FormControl>
      <Typography
        color="#2E7D32"
        component="h1"
        variant="h5"
        sx={{ m: "10% auto" }}
      >
        New Administrator
      </Typography>
      <TextField
        id="outlined-basic"
        label="Name"
        variant="outlined"
        sx={{ m: "10% auto" }}
        onChange={handleNameChange}
      />

      <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        autoComplete="current-password"
        onChange={handlePassChange}
      />
      <Button
        color="success"
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        onClick={handleSubmit}
      >
        Add Administrator
      </Button>
      <Button
        color="success"
        variant="text"
        size="medium"
        sx={{ margin: "10px auto" }}
        // href="/admin/adminDash"
        onClick={() => {
          history.push("/admin/adminDash");
        }}
      >
        Back to Dashboard
      </Button>
    </FormControl>
  );
};

export default Administrator;
