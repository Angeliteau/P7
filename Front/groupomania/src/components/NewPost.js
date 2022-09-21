import React, { useState } from "react";
import axios from "axios";

////////// CREATION D'UN POST //////////
const NewPost = () => {
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);

  const handlePost = () => {
    // Mise en forme de la requête pour sa création
    if (message || file) {
      const data = new FormData();
      data.append("post", `{"message":"${message}"}`);
      if (file) data.append("image", file);
      console.log(data);
      axios
        .post(`http://localhost:3000/api/posts`, data, {
          withCredentials: true,
        })
        .then(() => {
          window.location.reload();
        });
    } else {
      alert("Veuillez entrer un message !");
    }
  };

  const handlePicture = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <div className="NewPost">
      <div className="post-form">
        <textarea
          name="message"
          id="message"
          placeholder="Créer un post !"
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          aria-labelledby="file-upload"
        />
        <div className="Send">
          <>
            <label className="LabelImage" htmlFor="file-upload">
              Insérer une image
              <input
                type="file"
                id="file-upload"
                name="file"
                accept=".jpg, .jpeg, .png"
                onChange={(e) => handlePicture(e)}
              />
            </label>
          </>
          <button className="send" onClick={handlePost}>
            Envoyer
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewPost;
