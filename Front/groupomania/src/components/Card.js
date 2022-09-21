import React, { useState, useEffect } from "react";
import axios from "axios";
import Like from "./Like";
import Delete from "./Delete";

////////// POST UNIQUE //////////
const Card = ({ post }) => {
  const userId = window.location.pathname.substr(7);

  let id = post.userId;
  // Mise en forme de la date
  const dateParser = (num) => {
    let options = {
      hour: "2-digit",
      minute: "2-digit",
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric",
    };

    let timestamp = Date.parse(num);

    let date = new Date(timestamp).toLocaleDateString("fr-FR", options);

    return date.toString();
  };

  const [pseudo, setPseudo] = useState("");
  const [admin, setAdmin] = useState("");
  const [isUpdated, setIsUpdated] = useState(false);
  const [textUpdate, setTextUpdate] = useState(null);
  const [file, setFile] = useState(null);

  // Récupération du pseudo du créteur du post
  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/auth/${id}`, { withCredentials: true })
      .then((res) => {
        setPseudo(res.data);
      });
  }, [id]);

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

  // Mise en forme de la requête pour le MAJ du post
  const updateItem = () => {
    const data = new FormData();
    if (textUpdate && file !== null) {
      data.append("post", `{"message":"${textUpdate}"}`);
      data.append("image", file);
    } else if (textUpdate === null && file === null && post.imageUrl !== null) {
      data.append("post", `{"message":"${post.message}"}`);
      data.append("image", post.imageUrl);
    } else if (textUpdate === null && file !== null && post.imageUrl !== null) {
      data.append("post", `{"message":"${post.message}"}`);
      data.append("image", file);
    } else if (textUpdate && file === null && post.imageUrl !== null) {
      data.append("message", textUpdate);
      data.append("image", post.imageUrl);
    }

    // Si MAJ detecté dans le textearea => MAJ du post
    axios
      .put(`http://localhost:3000/api/posts/${post._id}`, data, {
        withCredentials: true,
      })
      .then((res) => {
        window.location.reload();
      });

    setIsUpdated(false);
  };

  const handlePicture = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <div className="Card">
      <div className="Info">
        <div className="Name">{pseudo.pseudo}</div>
        <div className="Date">{dateParser(post.createdAt)}</div>
      </div>
      <div>{post.imageUrl && <img src={post.imageUrl} alt={post} />}</div>
      {isUpdated === false && <p>{post.message}</p>}
      {isUpdated && (
        <div className="update-post">
          <textarea
            defaultValue={post.message}
            onChange={(e) => setTextUpdate(e.target.value)}
          />
          <div className="button-container">
            <button className="btn" onClick={updateItem}>
              Valider modification
            </button>
          </div>
        </div>
      )}
      <div className="Icone">
        <Like post={post} />
        {userId === post.userId && (
          <i
            className="fa-regular fa-pen-to-square"
            onClick={() => setIsUpdated(!isUpdated)}
          ></i>
        )}
        {isUpdated && post.imageUrl && (
          <label className="LabelImage1">
            <i className="fa-solid fa-image"></i>
            <input
              type="file"
              id="file-upload"
              name="file"
              accept=".jpg, .jpeg, .png"
              onChange={(e) => handlePicture(e)}
            />
          </label>
        )}
        {admin.Admin && userId !== post.userId && (
          <i
            className="fa-regular fa-pen-to-square"
            onClick={() => setIsUpdated(!isUpdated)}
          ></i>
        )}
        <Delete post={post} />
      </div>
    </div>
  );
};

export default Card;
