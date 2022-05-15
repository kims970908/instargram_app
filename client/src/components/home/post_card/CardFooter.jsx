import React from "react";
import { Link } from "react-router-dom";
import Send from "../../../images/send.svg";

const CardFooter = ({ post }) => {
  return (
    <div className="card_footer">
      <div className="card_icon_menu">
        <div>
          <i className="far fa-heart" />
          <Link className="text-dark" to={`/post/${post._id}`}>
            <i className="far fa-comment"></i>
          </Link>

          <img src={Send} alt="Send" />
        </div>

        <i className="far fa-bookmark" />
      </div>

      <div className="d-flex justify-content-between">
        <h6 style={{ padding: "0 25px", cursor: "pointer" }}>
          {post.likes.length} 좋아요
        </h6>
        <h6 style={{ padding: "0 25px", cursor: "pointer" }}>
          {post.likes.length} 댓글
        </h6>
      </div>
    </div>
  );
};

export default CardFooter;
