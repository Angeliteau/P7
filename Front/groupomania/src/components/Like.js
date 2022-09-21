import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const Like = ({ post }) => {
  const userId = window.location.pathname.substr(7);
  const [liked, setLiked] = useState(false);

  const data = {
    req: Cookies.get(),
  };

  // Si le post à déjà été liké par l'utilisateur => setLiked(true)
  useEffect(() => {
    if (post.likers.includes(userId)) setLiked(true);
  }, [userId, post.likers, liked]);

  // Like du post
  const like = () => {
    axios
      .patch(`http://localhost:3000/api/posts/${post._id}/like`, data, {
        withCredentials: true,
      })
      .then(() => {
        setLiked(true);
      })
      .catch((err) => {
        console.log(err.request.response);
      });
  };

  // Unlike du post
  const unlike = () => {
    axios
      .patch(`http://localhost:3000/api/posts/${post._id}/unlike`, data, {
        withCredentials: true,
      })
      .then(() => {
        setLiked(false);
      })
      .catch((err) => {
        console.log(err.request.response);
      });
  };

  return (
    <div>
      {liked === false && (
        <i className="fa-regular fa-heart" onClick={like}></i>
      )}

      {liked && <i className="fa-solid fa-heart" onClick={unlike}></i>}
    </div>
  );
};

export default Like;
