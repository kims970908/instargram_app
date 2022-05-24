import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Send from "../../../images/send.svg";
import LikeButton from "../../LikeButton";
import ShareModal from "../../ShareModal";
import {BASE_URL} from '../../../utils/config'

import { useSelector, useDispatch } from "react-redux";
import { likePost, unLikePost } from "../../../redux/actions/postAction";

const CardFooter = ({ post }) => {
  const [isLike, setIsLike] = useState(false);
  const [loadLike, setLoadLike] = useState(false);
  const [isShare, setIsShare] = useState(false);

  const dispatch = useDispatch();
  const { auth, theme } = useSelector((state) => state);

  const handleLike = async () => {
    if (loadLike) return;
    setIsLike(true);
    
    setLoadLike(true);
    await dispatch(likePost({post, auth}));
    setLoadLike(false);
  };

  const handleUnLike = async() => {
    setIsLike(false);

    setLoadLike(true);
    await dispatch(unLikePost({post, auth}));
    setLoadLike(false);
  };
  
  useEffect(()=>{
    if(post.likes.find(like => like._id === auth.user._id)){
      setIsLike(true)
    }
  },[post.likes, auth.user._id])

  return (
    <div className="card_footer">
      <div className="card_icon_menu">
        <div>
          <LikeButton
            isLike={isLike}
            handleLike={handleLike}
            handleUnLike={handleUnLike}
          />

          <Link className="text-dark" to={`/post/${post._id}`}>
            <i className="far fa-comment"></i>
          </Link>

          <img src={Send} alt="Send" onClick={()=> setIsShare(!isShare)} />
        </div>

        <i className="far fa-bookmark" />
      </div>

      <div className="d-flex justify-content-between">
        <h6 style={{ padding: "0 25px", cursor: "pointer" }}>
          {post.likes.length} 좋아요
        </h6>
        <h6 style={{ padding: "0 25px", cursor: "pointer" }}>
          {post.comments.length} 댓글
        </h6>
      </div>
      {
        isShare &&
        <ShareModal url={`${BASE_URL}/post/${post._id}`} theme={theme} />
      }
    </div>
  );
};

export default CardFooter;
