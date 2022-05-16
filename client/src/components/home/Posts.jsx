import React from "react";
import PostCard from "../PostCard";

import { useSelector } from "react-redux";

const Posts = () => {
  const { homePosts } = useSelector((state) => state);
  return (
    <div className="posts">
      {homePosts.posts.map((post) => (
        <PostCard key={post._id} post={post}/>
      ))}
    </div>
  );
};

export default Posts;
