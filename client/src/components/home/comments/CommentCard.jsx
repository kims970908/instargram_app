import React, { useState, useEffect } from "react";
import Avatar from "../../Avatar";
import LikeButton from "../../LikeButton";
import CommentMenu from "./CommentMenu";
import { updateComment } from "../../../redux/actions/commentAction";

import moment from "moment";
import "moment/locale/ko";
import { useSelector, useDispatch } from "react-redux";

import { Link } from "react-router-dom";

const CommentCard = ({ comment, post }) => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [content, setContent] = useState("");
  const [readMore, setReadMore] = useState(false);

  const [isLike, setIsLike] = useState(false);
  const [onEdit, setOnEdit] = useState(false);

  useEffect(() => {
    setContent(comment.content);
  }, [comment]);

  const handleUpdate = () => {
    if (comment.content !== content) {
      dispatch(updateComment({ comment, post, content, auth }));
      setOnEdit(false);
    } else {
      setOnEdit(false);
    }
  };

  const styleCard = {
    opacity: comment._id ? 1 : 0.5,
    pointerEvents: comment._id ? "inherit" : "none",
  };

  const handleLike = () => {};

  const handleUnLike = () => {};

  return (
    <div className="comment_card mt-2" style={styleCard}>
      <Link to={`/profile/${comment.user._id}`} className="d-flex text-dark">
        <Avatar src={comment.user.avatar} size="small-avatar" />
        <h6 className="mx-1">{comment.user.username}</h6>
      </Link>

      <div className="comment_content">
        <div className="flex-fill">
          {onEdit ? (
            <textarea
              rows="5"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          ) : (
            <div>
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
          {moment(comment.createdAt).fromNow()}
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
          <small className="font-weight-bold mr-3">댓글</small>
        )}
      </div>
    </div>
  );
};

export default CommentCard;
