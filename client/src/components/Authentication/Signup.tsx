"use client";
import { actions } from "@/services/userService";
import React, { useState } from "react";

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

interface SignupProps {
  setAuth: React.Dispatch<React.SetStateAction<boolean>>;
}

const Signup: React.FC<SignupProps> = ({ setAuth }) => {
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

    if (response.success === false) {
      if (response?.message == "User already exists") {
        console.log("Cet utilisateur existe déjà");
        setError({ ...error, email: "Cet utilisateur existe déjà" });
        return;
      } else {
        console.log("Erreur lors de l'inscription");
        return;
      }
    } else {
      console.log("Utilisateur créé");
      setAuth(true);
      return;
    }
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
      <button onClick={() => setAuth(false)}>
        Déjà inscrit? Connectez-vous!
      </button>
    </div>
  );
};

export default Signup;
