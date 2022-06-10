import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Avatar from "../Avatar";

const CallModal = () => {
  const { call } = useSelector((state) => state);
  const dispatch = useDispatch();
  return (
    <div className="call_modal">
      <div className="call_box">
        <div></div>
      </div>
    </div>
  );
};

export default CallModal;
