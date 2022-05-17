import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createComment } from "../../redux/actions/commentAction";

const InputComment = ({ children, post }) => {
  const [content, setContent] = useState("");

  const { auth } = useSelector((state) => state);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!content.trim()) return;

    setContent('')

    const newComment = {
      content,
      likes:[],
      user: auth.user,
      createdAt : new Date().toISOString()
    }
    dispatch(createComment({post, newComment, auth}))
  };
  return (
    <form className="card-footer comment_input" onSubmit={handleSubmit}>
      {children}
      <input
        type="text"
        name=""
        placeholder="댓글을 적어주세요"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button type="submit" className="postBtn">
        전송
      </button>
    </form>
  );
};

export default InputComment;
