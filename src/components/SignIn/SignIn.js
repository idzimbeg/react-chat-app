import React from "react";

import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import { auth } from "../../firebase/firebase";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  Box,
  CssBaseline,
  Container,
  Typography,
  Button,
  Avatar,
} from "@mui/material";
import LocalFireDepartmentTwoToneIcon from "@mui/icons-material/LocalFireDepartmentTwoTone";

export default function SignIn() {
  const theme = createTheme();
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container>
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
            <LocalFireDepartmentTwoToneIcon />
          </Avatar>
          <Button
            variant="outlined"
            sx={{ mt: 3, mb: 2, bgcolor: "secondary.main" }}
            onClick={signInWithGoogle}
          >
            <Typography color="common.black">Sign in with Google</Typography>
          </Button>
          <Typography component="h1" variant="h5">
            Start Chatting!
          </Typography>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
