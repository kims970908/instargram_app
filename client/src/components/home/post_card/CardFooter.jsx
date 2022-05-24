import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Send from "../../../images/send.svg";
import LikeButton from "../../LikeButton";
import ShareModal from "../../ShareModal";
import { BASE_URL } from "../../../utils/config";

import { useSelector, useDispatch } from "react-redux";
import {
  likePost,
  savePost,
  unLikePost,
  unSavePost,
} from "../../../redux/actions/postAction";

const CardFooter = ({ post }) => {
  const [isLike, setIsLike] = useState(false);
  const [loadLike, setLoadLike] = useState(false);
  const [isShare, setIsShare] = useState(false);

  const [saved, setSaved] = useState(false)
  const [saveLoad, setSaveLoad] = useState(false)

  const dispatch = useDispatch();
  const { auth, theme } = useSelector((state) => state);

  //likes
  const handleLike = async () => {
    if (loadLike) return;
    setIsLike(true);

    setLoadLike(true);
    await dispatch(likePost({ post, auth }));
    setLoadLike(false);
  };

  //unlikes
  const handleUnLike = async () => {
    setIsLike(false);

    setLoadLike(true);
    await dispatch(unLikePost({ post, auth }));
    setLoadLike(false);
  };

  // likes
  useEffect(() => {
    if (post.likes.find((like) => like._id === auth.user._id)) {
      setIsLike(true);
    }
  }, [post.likes, auth.user._id]);

  // bookmark
  useEffect(() => {
    if (auth.user.saved.find((id) => id === post._id)) {
      setSaved(true);
    } else {
      setSaved(false);
    }
  }, [auth.user.saved, post._id]);

  const handleSavePost = async () => {
    if (saveLoad) return;
    setSaveLoad(true);

    setSaveLoad(true);
    await dispatch(savePost({ post, auth }));
    setSaveLoad(false);
  };

  const handleUnSavePost = async () => {
    setSaveLoad(false);

    setSaveLoad(true);
    await dispatch(unSavePost({ post, auth }));
    setSaveLoad(false);
  };

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

          <img src={Send} alt="Send" onClick={() => setIsShare(!isShare)} />
        </div>

        {saved ? (
          <i className="fas fa-bookmark text-info" onClick={handleUnSavePost} />
        ) : (
          <i className="far fa-bookmark" onClick={handleSavePost} />
        )}
      </div>

      <div className="d-flex justify-content-between">
        <h6 style={{ padding: "0 25px", cursor: "pointer" }}>
          {post.likes.length} 좋아요
        </h6>
        <h6 style={{ padding: "0 25px", cursor: "pointer" }}>
          {post.comments.length} 댓글
        </h6>
      </div>
      {isShare && (
        <ShareModal url={`${BASE_URL}/post/${post._id}`} theme={theme} />
      )}
    </div>
  );
};

export default CardFooter;
