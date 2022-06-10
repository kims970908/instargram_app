import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Avatar from "../Avatar";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";

const CallModal = () => {
  const { call } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [mins, setMins] = useState(0);
  const [second, setSecond] = useState(0);
  const [total, setTotal] = useState(0);
  const [answer, setAnswer] = useState(false);

  useEffect(() => {
    const setTime = () => {
      setTotal((t) => t + 1);
      setTimeout(setTime, 1000);
    };
    setTime();

    return () => setTotal(0);
  }, []);

  useEffect(() => {
    setSecond(total % 60);
    setMins(parseInt(total / 60));
  }, [total]);

  useEffect(() => {
    if (answer) {
      setTotal(0);
    } else {
      const timer = setTimeout(() => {
        dispatch({ type: GLOBALTYPES.CALL, payload: null });
      }, 15000);
      return () => clearTimeout(timer);
    }
  }, [dispatch, answer]);

  //통화 종료
  const handleEndCall = () => {
    dispatch({ type: GLOBALTYPES.CALL, payload: null });
  };
  const handleAnswer = () => {
    setAnswer(true);
  };

  return (
    <div className="call_modal">
      <div className="call_box">
        {/* style={{padding: "40px 0"}} */}
        <div className="text-center">
          <Avatar src={call.avatar} size="supper-avatar" />
          <h4>{call.username}</h4>
          <h6>{call.fullname}</h6>

          <div>
            {call.video ? <span>call Video</span> : <span>call audio</span>}
          </div>
        </div>
        <div className="timer">
          <small>{mins.toString().length < 2 ? "0" + mins : mins}</small>
          <small>:</small>
          <small>{second.toString().length < 2 ? "0" + second : second}</small>
        </div>
        <div className="call_menu">
          <span className="material-icons text-danger" onClick={handleEndCall}>
            call_end
          </span>
          <>
            {call.video ? (
              <span
                className="material-icons text-success"
                onClick={handleAnswer}
              >
                videocam
              </span>
            ) : (
              <span
                className="material-icons text-success"
                onClick={handleAnswer}
              >
                call
              </span>
            )}
          </>
        </div>
      </div>
    </div>
  );
};

export default CallModal;
