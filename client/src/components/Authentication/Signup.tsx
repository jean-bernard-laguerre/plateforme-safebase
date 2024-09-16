"use client";
import { actions } from "@/services/userService";
import { useState } from "react";

interface User {
  email: string;
  password: string;
  confpassword: string;
}

interface Error {
  email: string;
  password: string;
  confpassword: string;
}

function Signup() {
  const [user, setUser] = useState<User>({
    email: "",
    password: "",
    confpassword: "",
  });
  const [error, setError] = useState<Error>({
    email: "",
    password: "",
    confpassword: "",
  });

  async function handleSubmit(user: User) {
    const { email, password, confpassword } = user;

    if (!email) {
      console.log("Veuillez renseigner un email");
      setError({ ...error, email: "Veuillez renseigner un email" });
      return;
    }
    if (!password) {
      console.log("Veuillez renseigner un mot de passe");
      setError({ ...error, password: "Veuillez renseigner un mot de passe" });
      return;
    }
    if (!confpassword) {
      console.log("Veuillez confirmer votre mot de passe");
      setError({
        ...error,
        confpassword: "Veuillez confirmer votre mot de passe",
      });
      return;
    }
    if (password !== confpassword) {
      console.log("Les mots de passe ne correspondent pas");
      setError({
        ...error,
        confpassword: "Les mots de passe ne correspondent pas",
      });
      return;
    }
    const response = await actions.register(user);
    console.log(response);
  }

  return (
    <div>
      <form action="" method="post" className="bg-violet-400">
        <input
          type="email"
          name=""
          id=""
          // className="w-full"
          className={`w-full border ${
            error.email ? "border-red-500" : "border-gray-300"
          }`}
          onChange={(e) => {
            setUser({ ...user, email: e.target.value });
            setError({ ...error, email: "" });
          }}
        />
        {error.email && <p>{error.email}</p>}
        <input
          type="password"
          name="password"
          id=""
          // className="w-full"
          className={`w-full ${
            error.password ? "border-red-500" : "border-gray-300"
          }`}
          onChange={(e) => {
            setUser({ ...user, password: e.target.value });
            setError({ ...error, password: "" });
          }}
        />
        {error.password && <p>{error.password}</p>}
        <input
          type="password"
          name="confpassword"
          id=""
          // className="w-full"
          className={`w-full ${
            error.confpassword ? "border-red-500" : "border-gray-300"
          }`}
          onChange={(e) => {
            setUser({ ...user, confpassword: e.target.value });
            setError({ ...error, confpassword: "" });
          }}
        />
        {error.confpassword && <p>{error.confpassword}</p>}
        <input
          type="submit"
          value="Inscrivez-vous!"
          className="w-full"
          onClick={(e) => {
            e.preventDefault();
            handleSubmit(user);
          }}
        />
      </form>
    </div>
  );
}

export default Signup;
