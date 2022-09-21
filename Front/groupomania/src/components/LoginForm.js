import React, { useState } from "react";
import axios from "axios";

////////// SE CONNECTER //////////
const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Envoi du formulaire au Back
  const handleLogin = (e) => {
    e.preventDefault();
    const emailError = document.querySelector(".email.error");
    const passwordError = document.querySelector(".password.error");

    // Mise en forme de la requête Login
    const data = {
      email,
      password,
    };

    axios
      .post(`http://localhost:3000/api/auth/login`, data, {
        withCredentials: true,
      })
      .then((res) => {
        // Si res => redirection sur la page posts
        emailError.innerHTML = "";
        passwordError.innerHTML = "";
        window.location = `/posts/${res.data}`;
      })
      .catch((error) => {
        // Si error => affichage d'un message d'erreur
        passwordError.innerHTML = "La paire Email/Mot de passe est incorrect !";
        emailError.innerHTML = "";
      });
  };

  return (
    <form action="" onSubmit={handleLogin}>
      <label htmlFor="email">Email</label>
      <br />
      <input
        type="text"
        name="email"
        id="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <div className="email error"></div>
      <br />
      <label htmlFor="password">Mot de passe</label>
      <br />
      <input
        type="password"
        name="password"
        id="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <div className="password error"></div>
      <br />
      <input type="submit" value="Se connecter" id="Seconnecter" />
    </form>
  );
};

export default LoginForm;
