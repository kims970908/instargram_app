import React, { useState, useEffect, useRef } from "react";
import UserCard from "../UserCard";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import MsgDisplay from "./MsgDisplay";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";
import { imageUpload } from "../../utils/imageUpload";
import Icons from "../Icons";
import { videoShow, imageShow } from "../../utils/mediaShow";
import {
  addMessage,
  getMessages,
  MESS_TYPES,
} from "../../redux/actions/messageAction";
import LoadIcon from "../../images/loading.gif";

const RightSide = () => {
  const { auth, message, theme, socket } = useSelector((state) => state);
  const dispatch = useDispatch();

  const { id } = useParams();

  const [user, setUser] = useState([]);
  const [text, setText] = useState("");
  const [media, setMedia] = useState([]);
  const [loadMedia, setLoadMedia] = useState(false);

  const refDisplay = useRef();
  const pageEnd = useRef();
  const [page, setPage] = useState(0)

  //유저 받아오기
  useEffect(() => {
    const newUser = message.users.find((user) => user._id === id);
    if (newUser) {
      setUser(newUser);
      setPage(1)
    }
  }, [message.users, id]);

  //파일 업로드
  const handleChangeMedia = (e) => {
    const files = [...e.target.files];
    let err = "";
    let newMedia = [];

    files.forEach((file) => {
      if (!file) return (err = "존재하지않는파일입니다");
      if (file.size > 1024 * 1024 * 5) {
        return (err = "파일이 너무 큽니다");
      }
      return newMedia.push(file);
    });
    if (err) dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err } });
    setMedia([...media, ...newMedia]);
  };
  //업로드 파일 삭제
  const handleDeleteMedia = (index) => {
    const newArr = [...media];
    newArr.splice(index, 1);
    setMedia(newArr);
  };

  // 메세지 보내기
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim() && media.length === 0) return;
    setText("");
    setMedia([]);
    setLoadMedia(true);

    let newArr = [];
    if (media.length > 0) newArr = await imageUpload(media);

    const msg = {
      sender: auth.user._id,
      recipient: id,
      text,
      media: newArr,
      createdAt: new Date().toISOString(),
    };

    setLoadMedia(false);
    await dispatch(addMessage({ msg, auth, socket }));

    if (refDisplay.current) {
      refDisplay.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  };

  //메세지 받아오기
  useEffect(() => {
    if (id) {
      const getMessagesData = async () => {
        dispatch({ type: MESS_TYPES.GET_MESSAGES, payload: { messages: [] } });
        await dispatch(getMessages({ auth, id }));
        if (refDisplay.current) {
          refDisplay.current.scrollIntoView({
            behavior: "smooth",
            block: "end",
          });
        }
      };
      getMessagesData();
    }
  }, [auth, dispatch, id]);

  //더보기
  useEffect(()=>{
    const observer = new IntersectionObserver(entries =>{
      if(entries[0].isIntersecting){
        setPage(p => p +1)
      }
    }, {
      threshold: 0.1
    })
    observer.observe(pageEnd.current)
  },[setPage])

  // 더보기 datapage 제한생성
  useEffect(() =>{
    if(message.resultData >= (page -1) *9 && page >1){
      dispatch(getMessages({auth,id,page}))
    }
  },[message.resultData, page, id ,auth, dispatch])

  //refDisplay scroll Smooth Impact
  useEffect(()=>{
    if (refDisplay.current) {
      refDisplay.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  },[text])
  
  const handleAudioCall = () => {};

  const handleVideoCall = () => {};

  const handleDeleteConversation = () => {};

  return (
    <>
      <div className="message_header" style={{ cursor: "pointer" }}>
        {user.length !== 0 && (
          <UserCard user={user}>
            <div>
              <i className="fas fa-phone-alt" onClick={handleAudioCall} />

              <i className="fas fa-video mx-3" onClick={handleVideoCall} />

              <i
                className="fas fa-trash text-danger"
                onClick={handleDeleteConversation}
              />
            </div>
          </UserCard>
        )}
      </div>

      <div
        className="chat_container"
        style={{ height: media.length > 0 ? "calc(100% - 180px)" : "" }}
      >
        <div className="chat_display" ref={refDisplay}>
          <button style={{marginTop:'-25px', opacity:0}} ref={pageEnd}>더보기</button>
          {message.data.map((msg, index) => (
            <div key={index}>
              {msg.sender !== auth.user._id && (
                <div className="chat_row other_message">
                  <MsgDisplay user={user} msg={msg} theme={theme} />
                </div>
              )}
              {msg.sender === auth.user._id && (
                <div className="chat_row you_message">
                  <MsgDisplay user={auth.user} msg={msg} theme={theme} />
                </div>
              )}
            </div>
          ))}
          {loadMedia && (
            <div className="chat_row you_message">
              <img src={LoadIcon} alt="loading" />
            </div>
          )}
        </div>
      </div>
      <div
        className="show_media"
        style={{ display: media.length > 0 ? "grid" : "none" }}
      >
        {media.map((item, index) => (
          <div key={index} id="file_media">
            {item.type.match(/video/i)
              ? videoShow(URL.createObjectURL(item), theme)
              : imageShow(URL.createObjectURL(item), theme)}
            <span onClick={() => handleDeleteMedia(index)}>&times;</span>
          </div>
        ))}
      </div>

      <form className="chat_input" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="입력해주세요"
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={{
            filter: theme ? "invert(1)" : "invert(0)",
            background: theme ? "#040404" : "",
            color: theme ? "white" : "",
          }}
        />

        <Icons setContent={setText} content={text} theme={theme} />

        <div className="file_upload">
          <i className="fas fa-image text-danger" />
          <input
            type="file"
            name="file"
            id="file"
            multiple
            accept="image/*,video/*"
            onChange={handleChangeMedia}
          />
        </div>

        <button
          type="submit"
          className="material-icons"
          disabled={text || media.length > 0 ? false : true}
        >
          near_me
        </button>
      </form>
    </>
  );
};

export default RightSide;
