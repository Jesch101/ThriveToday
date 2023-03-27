import React, { useContext, useState, useEffect } from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../themes/theme";
import {
  Avatar,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Grid,
  Box,
  Typography,
  Container,
  Link,
  Alert,
  AlertTitle,
} from "@mui/material";
import UserContext from "../context/userContext";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axios";

function BadLogin(props) {
  useEffect(() => {
    // when the component is mounted, the alert is displayed for 8 seconds
    setTimeout(() => {
      props.setAlert(false);
    }, 8000);
  });

  return (
    <Grid item sx={{ mb: 3 }}>
      <Box sx={{ width: "100%" }}>
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          Sign in error — <strong>username or password is incorrect.</strong>
        </Alert>
      </Box>
    </Grid>
  );
}

export default function SignIn() {
  const [alert, setAlert] = useState(false);

  const navigate = useNavigate();
  const user = useContext(UserContext);
  const initialFormData = Object.freeze({
    username: "",
    password: "",
  });

  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      // Trimming any whitespace
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (formData.username && formData.password) {
      axiosInstance
        .post(`/login`, {
          username: formData.username,
          password: formData.password,
        })
        .then((res) => {
          user.setUserInfoContext({
            username: res.data.username,
            userid: res.data.userid,
            email: res.data.email,
            firstname: res.data.firstname,
            lastname: res.data.lastname,
          });
          navigate("/");
        })
        .catch((err) => {
          setAlert(true);
          let errorBody = err.response;
          console.log(errorBody);
          return Promise.resolve(errorBody);
        });
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: theme.spacing(8),
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}>
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Username"
              name="username"
              autoFocus
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              onChange={handleChange}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            {alert ? <BadLogin alert={alert} setAlert={setAlert} /> : null}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}>
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/sign-up" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
