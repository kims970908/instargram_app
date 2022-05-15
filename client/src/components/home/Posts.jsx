import React from "react";
import CardHeader from "./post_card/CardHeader";
import CardBody from "./post_card/CardBody";
import CardFooter from "./post_card/CardFooter";

import { useSelector } from "react-redux";

const Posts = () => {
  const { homePosts } = useSelector((state) => state);
  return (
    <div className="posts">
      {homePosts.posts.map((post) => (
        <div className="card my-3" key={post._id}>
          <CardHeader post={post} />
          <CardBody post={post}  />
          <CardFooter post={post} />
        </div>
      ))}
    </div>
  );
};

export default Posts;
