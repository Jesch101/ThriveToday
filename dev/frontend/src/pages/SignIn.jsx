import React, { useContext } from "react";
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
} from "@mui/material";
import UserContext from "../context/userContext";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  const navigate = useNavigate();
  const user = useContext(UserContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // console.log({
    //   email: data.get("email"),
    //   password: data.get("password"),
    // });
    user.setUserInfoContext({
      ...user.userInfoContext,
      username: data.get("email"),
    });
    navigate("/");
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
              name="email"
              autoComplete="email"
              autoFocus
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
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
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
