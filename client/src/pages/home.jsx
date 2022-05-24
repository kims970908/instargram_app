import React from "react";
import Posts from "../components/home/Posts";
import Status from "../components/home/Status";
import LoadIcon from "../images/loading.gif";
import RightSideBar from '../components/home/RightSideBar'

import { useSelector } from "react-redux";

const Home = () => {
  const { homePosts } = useSelector((state) => state);
  return (
    <div className="home row mx-0">
      <div className="col-md-8">
        <Status />

        {homePosts.loading ? (
          <img src={LoadIcon} alt="loading" className="d-block mx-auto" />
        ) : homePosts.result === 0 && homePosts.posts.length === 0 ? (
          <h2 className="text-center">포스터가 없습니다</h2>
        ) : (
          <Posts />
        )}
      </div>
      <div className="col-md-4">
        <RightSideBar />
      </div>
    </div>
  );
};

export default Home;
