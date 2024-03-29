import React, { useState, useEffect } from "react";
import Avatar from "../../Avatar";
import LikeButton from "../../LikeButton";
import CommentMenu from "./CommentMenu";
import InputComment from "../InputComment";
import {
  updateComment,
  likeComment,
  unLikeComment,
} from "../../../redux/actions/commentAction";

import moment from "moment";
import "moment/locale/ko";
import { useSelector, useDispatch } from "react-redux";

import { Link } from "react-router-dom";

const CommentCard = ({ children, comment, post, commentId }) => {
  const { auth, socket, theme } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [content, setContent] = useState("");
  const [readMore, setReadMore] = useState(false);

  const [onEdit, setOnEdit] = useState(false);
  const [isLike, setIsLike] = useState(false);
  const [loadLike, setLoadLike] = useState(false);

  const [onReply, setOnReply] = useState(false);

  useEffect(() => {
    setContent(comment.content);
    setIsLike(false);
    setOnReply(false);
    if (comment.likes.find((like) => like._id === auth.user._id)) {
      setIsLike(true);
    }
  }, [comment, auth.user._id]);

  const styleCard = {
    opacity: comment._id ? 1 : 0.5,
    pointerEvents: comment._id ? "inherit" : "none",
  };

  const handleUpdate = () => {
    if (comment.content !== content) {
      dispatch(updateComment({ comment, post, content, auth }));
      setOnEdit(false);
    } else {
      setOnEdit(false);
    }
  };

  const handleLike = async () => {
    if (loadLike) return;
    setIsLike(true);

    setLoadLike(true);
    // socket, commentId
    await dispatch(likeComment({ comment, post, auth  }));
    setLoadLike(false);
  };

  const handleUnLike = async () => {
    if (loadLike) return;
    setIsLike(false);

    setLoadLike(true);
    await dispatch(unLikeComment({ comment, post, auth, socket, commentId }));
    setLoadLike(false);
  };

  const handleReply = () => {
    if (onReply) return setOnReply(false);
    setOnReply({ ...comment, commentId });
  };

  return (
    <div className="comment_card mt-2" style={styleCard}>
      <Link to={`/profile/${comment.user._id}`} className="d-flex text-dark">
        <Avatar src={comment.user.avatar} size="small-avatar" />
        <h6 className="mx-1">{comment.user.username}</h6>
      </Link>

      <div className="comment_content">
        <div
          className="flex-fill"
          style={{
            filter: theme ? "invert(1)" : "invert(0)",
            color: theme ? "white" : "#111",
          }}
        >
          {onEdit ? (
            <textarea
              rows="5"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          ) : (
            <div>
              {comment.tag && comment.tag._id !== comment.user._id && (
                <Link to={`/profile/${comment.tag._id}`} className="mr-2">
                  @{comment.tag.username}
                </Link>
              )}
              <span>
                {content.length < 100
                  ? content
                  : readMore
                  ? content + " "
                  : content.slice(0, 100) + "..."}
              </span>
              {content.length > 100 && (
                <span
                  className="readMore"
                  onClick={() => setReadMore(!readMore)}
                >
                  {readMore ? "감추기" : "더보기"}
                </span>
              )}
            </div>
          )}
        </div>

        <div className="d-flex align-items-center mr-2">
          <LikeButton
            isLike={isLike}
            handleLike={handleLike}
            handleUnLike={handleUnLike}
          />

          <CommentMenu
            post={post}
            comment={comment}
            auth={auth}
            setOnEdit={setOnEdit}
          />
        </div>
      </div>

      <div style={{ cursor: "pointer" }}>
        <small className="text-muted mr-3">
          {moment(comment.updatedAt).fromNow()}
        </small>

        <small className="font-weight-bold mr-3">
          {comment.likes.length} 좋아요
        </small>
        {onEdit ? (
          <>
            <small className="font-weight-bold mr-3" onClick={handleUpdate}>
              수정
            </small>
            <small
              className="font-weight-bold mr-3"
              onClick={(e) => setOnEdit(false)}
            >
              취소
            </small>
          </>
        ) : (
          <small className="font-weight-bold mr-3" onClick={handleReply}>
            {onReply ? "취소" : "댓글"}
          </small>
        )}
      </div>
      {onReply && (
        <InputComment post={post} onReply={onReply} setOnReply={setOnReply}>
          <Link to={`/profile/${onReply.user._id}`} className="mr-1">
            @{onReply.user.username}
          </Link>
        </InputComment>
      )}
      {children}
    </div>
  );
};

export default CommentCard;
