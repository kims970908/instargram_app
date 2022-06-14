import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { follow, unfollow } from "../redux/actions/profileAction";

const FollowBtn = ({ user }) => {
  const [followed, setFollowed] = useState(false);

  const { auth, profile, socket } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [load, setLoad] = useState(false);

  // -----------------follow user data-----------------------------
  useEffect(() => {
    if (auth.user.following.find((item) => item._id === user._id)) {
      setFollowed(true);
    }
    return () => setFollowed(false);
  }, [auth.user.following, user._id]);
  // ----------------팔로우 handler------------------------------
  const handleFollow = async () => {
    if (load) return;

    setFollowed(true);
    setLoad(true);
    setLoad(false);
    await dispatch(follow({ users: profile.users, user, auth, socket }));
  };
  // ----------------언팔로우 handler------------------------------
  const handleUnFollow = async () => {
    if (load) return;

    setFollowed(false);
    setLoad(true);
    setLoad(false);
    await dispatch(unfollow({ users: profile.users, user, auth, socket }));
  };

  return (
    <>
      {followed ? (
        <button className="btn btn-outline-danger" onClick={handleUnFollow}>
          언팔로우
        </button>
      ) : (
        <button className="btn btn-outline-info" onClick={handleFollow}>
          팔로우
        </button>
      )}
    </>
  );
};

export default FollowBtn;
