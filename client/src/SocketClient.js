import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { POST_TYPES } from "./redux/actions/postAction";

const SocketClient = () => {
  const { auth, socket } = useSelector((state) => state);
  const dispatch = useDispatch();

  //connect User
  useEffect(() => {
    socket.emit("joinUser", auth.user._id);
  }, [socket, auth.user._id]);

  // like
  useEffect(() => {
    socket.on("likeToClient", (newPost) => {
      dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost });
    });
    return () => socket.off("likeToClient");
  }, [socket, dispatch]);

  //unlike
  useEffect(() => {
    socket.on("unLikeToClient", (newPost) => {
      dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost });
    });
    return () => socket.off("unLikeToClient");
  }, [socket, dispatch]);

  //Comment
  useEffect(() => {
    socket.on("createCommentToClient", (newPost) => {
      dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost });
    });
    return () => socket.off("createCommentToClient");
  }, [socket, dispatch]);

  //deleteComment
  useEffect(() => {
    socket.on("deleteCommentToClient", (newPost) => {
      dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost });
    });
    return () => socket.off("deleteCommentToClient");
  }, [socket, dispatch]);

  return <></>;
};

export default SocketClient;
