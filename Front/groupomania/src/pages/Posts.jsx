import React from "react";
import NavBar from "../components/NavBar";
import Thread from "../components/Thread";
import NewPost from "../components/NewPost";

////////// PAGE DES POSTS //////////
const Posts = () => {
  return (
    <div>
      <NavBar />
      <NewPost />
      <Thread />
    </div>
  );
};

export default Posts;
