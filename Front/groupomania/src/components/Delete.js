import React, { useEffect, useState } from "react";
import axios from "axios";

const Delete = ({ post }) => {
  // Récupération de l'id de l'utilisateur disponible dans l'URL
  const userId = window.location.pathname.substr(7);

  const [admin, setAdmin] = useState("");

  // Récupération des infos de l'utilisateur pour savoir s'il est Admin
  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/auth/${userId}`, {
        withCredentials: true,
      })
      .then((res) => {
        setAdmin(res.data);
      });
  }, [userId]);

  // Suppression du post
  const handleLogin = () => {
    axios
      .delete(`http://localhost:3000/api/posts/${post._id}`, {
        withCredentials: true,
      })
      .then(() => {
        window.location.reload();
      });
  };

  return (
    <div>
      {admin.Admin && userId !== post.userId && (
        <i className="fa-solid fa-trash-can" onClick={handleLogin}></i>
      )}
      {post.userId === userId && (
        <i className="fa-solid fa-trash-can" onClick={handleLogin}></i>
      )}
    </div>
  );
};

export default Delete;
