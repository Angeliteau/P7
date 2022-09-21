import axios from "axios";
import React, { useState, useEffect } from "react";
import Card from "./Card";

////////// FIL D'ACTUALITE //////////
const Thread = () => {
  const [post, setPost] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/posts`, { withCredentials: true })
      .then((res) => {
        setPost(res.data);
      });
  }, []);

  if (post.length > 0) {
    return (
      <div className="Thread">
        <ul>
          {post.map((el) => {
            return <Card post={el} key={el._id} />;
          })}
        </ul>
      </div>
    );
  }
};

export default Thread;
