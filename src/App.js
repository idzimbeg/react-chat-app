import React from "react";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase/firebase";

import ChatRoom from "./components/ChatRoom/ChatRoom";
import SignIn from "./components/SignIn/SignIn";

function App() {
  const [user] = useAuthState(auth);

  return (
    <>
      <div>{user ? <ChatRoom /> : <SignIn />}</div>
    </>
  );
}

export default App;
