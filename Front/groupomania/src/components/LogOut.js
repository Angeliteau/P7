import React from "react";
import axios from "axios";
import cookie from "js-cookie";

////////// SE DECONNECTER //////////
const Logout = () => {
  const logout = () => {
    // Suppression du cookie en Front
    const removeCookie = (key) => {
      if (window !== "undefined") {
        cookie.remove(key, { expires: 1 });
      }
    };

    // Suppression du cookie en Back
    axios
      .post(`http://localhost:3000/api/auth/logout`, { withCredentials: true })
      .then(() => {
        removeCookie("jwt");
        window.location = `http://localhost:3001/`;
      })
      .catch((err) => console.log(err));
  };

  return (
    <i className="fa-solid fa-arrow-right-from-bracket " onClick={logout}></i>
  );
};

export default Logout;
