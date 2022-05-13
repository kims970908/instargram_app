import React from "react";

import { useSelector, useDispatch } from "react-redux";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";

import Avatar from "../Avatar";

const Status = () => {
  const { auth } = useSelector((state) => state);
  const distpatch = useDispatch();
  return (
    <div className="status my-3 d-flex">
      <Avatar src={auth.user.avatar} size="big-avatar" />

      <button
        className="statusBtn flex-fill"
        onClick={() => distpatch({ type: GLOBALTYPES.STATUS, payload: true })}
      >
        {auth.user.fullname}님, 무슨 생각하고 있으신가요?
      </button>
    </div>
  );
};

export default Status;
