"use client";
import React from "react";

interface SignInProps {
  setAuth: React.Dispatch<React.SetStateAction<boolean>>;
}

const SignIn: React.FC<SignInProps> = ({ setAuth }) => {
  return (
    <div>
      <form action="post" className="bg-violet-400">
        <input type="text" placeholder="email" className="w-full" />
        <input type="password" placeholder="password" className="w-full" />
        <button
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            console.log("Se Connecter!");
          }}
        >
          Se Connecter!
        </button>
      </form>
      <button onClick={() => setAuth(true)}>PLOUT!</button>
    </div>
  );
};

export default SignIn;
