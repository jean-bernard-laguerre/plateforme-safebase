"use client";
import { useState } from "react";
import SignIn from "./SignIn";
import Signup from "./Signup";

function Auhtentication() {
  const [toggleAuth, setToggleAuth] = useState<boolean>(false);
  return (
    <div>
      {toggleAuth ? (
        <Signup setAuth={setToggleAuth} />
      ) : (
        <SignIn setAuth={setToggleAuth} />
      )}
    </div>
  );
}

export default Auhtentication;
