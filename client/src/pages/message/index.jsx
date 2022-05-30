import React from "react";
import LeftSide from "../../components/message/LeftSide";

const Message = () => {
  return (
    <div className="message d-flex">
      <div className="col-md-4 border-right px-0">
        <LeftSide />
      </div>
      <div className="col-md-8 px-0 right_mes">
        <div
          className="d-flex justify-content-center 
                align-items-center flex-column h-100"
        >
          <i
            style={{ fontSize: "5rem" }}
            className="fab fa-facebook-messenger text-primary"
          />
          <h4>Messages</h4>
        </div>
      </div>
    </div>
  );
};

export default Message;
