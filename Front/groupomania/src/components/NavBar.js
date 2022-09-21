import Logout from "./LogOut";
import "../styles/Posts.css";
import axios from "axios";
import React, { useState, useEffect } from "react";
import logo from "../Images/icon-left-font-mini.png";

////////// NAVBAR //////////
const NavBar = () => {
  // Récupération de l'id de l'utilisateur disponible dans l'URL
  const userId = window.location.pathname.substr(7);

  const [pseudo, setPseudo] = useState("");

  // Récupération du pseudo  de l'utilisateur pour l'affichage
  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/auth/${userId}`, {
        withCredentials: true,
      })
      .then((res) => {
        setPseudo(res.data);
      });
  }, [userId]);

  return (
    <div className="NavBar">
      <img src={logo} alt="Logo Groupomania"></img>
      <ul>
        <li id="DisplayPseudo">Bonjour {pseudo.pseudo}</li>
        <li>
          <Logout />
        </li>
      </ul>
    </div>
  );
};

export default NavBar;
