import React from "react";
import { FormControl, TextField, Button, Typography } from "@mui/material";

const Administrator = () => {
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
      />
      <Button
        color="success"
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        Add Administrator
      </Button>
      <Button
        color="success"
        variant="text"
        size="medium"
        sx={{ margin: "10px auto" }}
        href="/admin/adminDash"
      >
        Back to Dashboard
      </Button>
    </FormControl>
  );
};

export default Administrator;
