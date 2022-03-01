import React from "react";

import { auth } from "../../firebase/firebase";

import { IconButton } from "@mui/material";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";

export default function SignOut() {
  return (
    <IconButton
      size="large"
      edge="start"
      color="inherit"
      aria-label="menu"
      sx={{ mr: 2 }}
    >
      {auth.currentUser && (
        <LogoutRoundedIcon
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={() => auth.signOut()}
        />
      )}
    </IconButton>
  );
}
