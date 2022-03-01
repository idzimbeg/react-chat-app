import React, { useRef, useState } from "react";

import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import { auth, firestore } from "../../firebase/firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";

import ChatMessage from "../ChatMessage/ChatMessage";
import SignOut from "../SignOut/SignOut";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  AppBar,
  Box,
  Card,
  CardContent,
  CardActions,
  CssBaseline,
  IconButton,
  Typography,
  Button,
  Avatar,
  Toolbar,
  TextField,
  Divider,
  List,
  ListItem,
  Grid,
} from "@mui/material";
import LocalFireDepartmentTwoToneIcon from "@mui/icons-material/LocalFireDepartmentTwoTone";

export default function ChatRoom() {
  const dummy = useRef();
  const messagesRef = firestore.collection("messages");
  const query = messagesRef.orderBy("createdAt").limit(25);

  const [messages] = useCollectionData(query, { idField: "id" });

  const [formValue, setFormValue] = useState("");
  const { uid, photoURL } = auth.currentUser;

  const theme = createTheme();

  const sendMessage = async (e) => {
    e.preventDefault();

    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL,
    });

    setFormValue("");
    dummy.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <AppBar sx={{ bgcolor: "secondary.main" }} position="static">
        <Toolbar>
          <LocalFireDepartmentTwoToneIcon />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Furnace-Chat
          </Typography>
          <SignOut />
        </Toolbar>
      </AppBar>
      <ThemeProvider theme={theme}>
        <Grid container spacing={1} sx={{ padding: "5rem" }}>
          <CssBaseline />
          <Grid item xs={10}>
            <Typography
              component="h1"
              variant="h5"
              sx={{ color: "common.black" }}
            >
              ChatRoom
            </Typography>
            <Box sx={{ flexGrow: 1 }}>
              <Box sx={{ maxWidth: "md", height: "100%" }}>
                <Card sx={{ minWidth: 275, zIndex: "modal" }}>
                  <CardContent>
                    {messages &&
                      messages.map((msg) => (
                        <ChatMessage key={msg.id} message={msg} />
                      ))}

                    <span ref={dummy}></span>
                    <Divider />
                    <Box
                      component="form"
                      onSubmit={sendMessage}
                      noValidate
                      sx={{ mt: 1 }}
                    >
                      <TextField
                        id="outlined-basic"
                        label="Message"
                        variant="outlined"
                        value={formValue}
                        onChange={(e) => setFormValue(e.target.value)}
                        sx={{ minWidth: "100%" }}
                      />
                      <CardActions>
                        <Button
                          type="submit"
                          disabled={!formValue}
                          variant="outlined"
                          sx={{ mt: 3, mb: 2, bgcolor: "secondary.main" }}
                        >
                          <Typography
                            component="h1"
                            variant="h5"
                            sx={{ color: "common.black" }}
                          >
                            Fire!
                          </Typography>
                        </Button>
                      </CardActions>
                    </Box>
                  </CardContent>
                </Card>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={2}>
            <Typography
              component="h1"
              variant="h5"
              sx={{ color: "common.black" }}
            >
              Members
            </Typography>
            <List
              sx={{
                display: "flex",
                justifyContent: "center",
                alignContent: "center",
                width: "100%",
                maxWidth: 360,
                bgcolor: "secondary.main",
                height: "100%",
                borderRadius: "10px",
              }}
            >
              <ListItem>
                <IconButton>
                  <Avatar sx={{ m: 1 }}>
                    <img
                      alt="User Avatar"
                      src={
                        photoURL ||
                        "https://api.adorable.io/avatars/23/abott@adorable.png"
                      }
                    />
                  </Avatar>
                </IconButton>
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </ThemeProvider>
    </>
  );
}
