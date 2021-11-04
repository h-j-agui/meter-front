import React, { useContext, useState } from "react";
import { useHistory, Redirect } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";

import { LoginContext } from "../utils/Context";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Meter
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function SignIn() {
  const history = useHistory();
  // const handleSubmit = (event) => {
  //   event.preventDefault();

  //   const data = new FormData(event.currentTarget);
  //   // eslint-disable-next-line no-console
  //   // axios.post("http://localhost:8080/")
  //   //   email: email,
  //   //   password: password
  // };
  const [pass, setPass] = useState("");

  const { loggedIn, setLoggedIn } = useContext(LoginContext);

  const handlePinChange = (e) => {
    setPass(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/login", {
        username: "any",
        password: pass,
      })
      .then((user) => {
        console.log(user);
        setLoggedIn(user.data.username);
      })
      .then(() => {
        if (loggedIn) {
          history.push("/meter");
        } else Redirect("/");
      })
      .catch((err) => console.log(err));
  };

  const handleCheck = () => {
    axios
      .get("/checkAuth")
      .then((response) => {
        console.log(response);
      })
      .catch((err) => console.log(err));
  };

  return (
    <ThemeProvider theme={theme}>
      <Container
        component="main"
        maxWidth="xs"
        sx={{
          color: "primary.main",
          border: { xs: "none", sm: "none", md: 1, lg: 1 },
        }}
      >
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <h1>{loggedIn}</h1>
          <Typography component="h1" variant="h5">
            Pin
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              onChange={handlePinChange}
              autoComplete="current-password"
              inputProps={{ maxLength: 4 }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSubmit}
            >
              Enter
            </Button>

            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Home
                </Link>
                <Button onClick={handleCheck}>checkauth</Button>
              </Grid>
              <Grid item>
                <Link href="/admin" variant="body2">
                  {"Administrator Login"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
