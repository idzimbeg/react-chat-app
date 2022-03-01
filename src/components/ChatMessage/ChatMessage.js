import React from "react";

import { Box, Typography, Avatar } from "@mui/material";

export default function ChatMessage(props) {
  const { text, photoURL } = props.message;

  return (
    <Box
      sx={{
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div>
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <img
            alt="User Avatar"
            src={
              photoURL ||
              "https://api.adorable.io/avatars/23/abott@adorable.png"
            }
          />
        </Avatar>
        <Typography>{text}</Typography>
      </div>
    </Box>
  );
}
