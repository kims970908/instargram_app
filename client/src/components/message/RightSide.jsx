import React, { useState, useEffect, useRef } from "react";
import UserCard from "../UserCard";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import MsgDisplay from "./MsgDisplay";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";
import { imageUpload } from "../../utils/imageUpload";
import Icons from '../Icons'

const RightSide = () => {
  const { auth, message, theme } = useSelector((state) => state);
  const dispatch = useDispatch();

  const { id } = useParams();
  const [user, setUser] = useState([]);
  const [text, setText] = useState("");
  const [media, setMedia] = useState([])
  const [loadMedia, setLoadMedia] = useState(false)

  const refDisplay = useRef()

  useEffect(() => {
    const newUser = message.users.find((user) => user._id === id);
    if (newUser) {
      setUser(newUser);
    }
  }, [message.users, id]);

  const handleChangeMedia = (e)=>{
    const files = [...e.target.files]
    let err = ''
    let newMedia = []

    files.forEach(file => {
      if(!file) return err = '존재하지않는파일입니다'

      if(file.size > 1024 * 1024 * 5){
        return err = '파일이 너무 큽니다'
      }

    return newMedia.push(file)
    })
    if(err) dispatch({type: GLOBALTYPES.ALERT, payload : {error: err}})
    setMedia([...media, ...newMedia])
  }

  const handleDeleteMedia = (index) =>{
    const newArr = [...media]
    newArr.splice(index,1)
    setMedia(newArr)
  }

  const handleSubmit = async (e) =>{
    e.preventDefault()
    if(!text.trim() && media.length === 0 ) return
    setText('')
    setMedia([])
    setLoadMedia(true)

    let newArr = []
    if(media.length > 0) newArr = await imageUpload(media)

    const msg = {
      sender : auth.user._id,
      recipient : id,
      text,
      media : newArr,
      createdAt : new Date().toISOString()
    }

    setLoadMedia(false)
    // await dispatch()

  }

  return (
    <>
      <div className="message_header">
        <UserCard user={user}>
          <i className="fas fa-trash text-danger"></i>
        </UserCard>
      </div>

      <div className="chat_container">
        <div className="chat_display">
          <div className="chat_row other_message">
            <MsgDisplay user={user} />
          </div>

          <div className="chat_row you_message">
            <MsgDisplay user={auth.user} />
          </div>
        </div>
      </div>

      <form className="chat_input" onSubmit={handleSubmit} >
                <input type="text" placeholder="Enter you message..."
                value={text} onChange={e => setText(e.target.value)}
                style={{
                    filter: theme ? 'invert(1)' : 'invert(0)',
                    background: theme ? '#040404' : '',
                    color: theme ? 'white' : ''
                }} />

                <Icons setContent={setText} content={text} theme={theme} />

                <div className="file_upload">
                    <i className="fas fa-image text-danger" />
                    <input type="file" name="file" id="file"
                    multiple accept="image/*,video/*" onChange={handleChangeMedia} />
                </div>

                <button type="submit" className="material-icons" 
                disabled={(text || media.length > 0) ? false : true}>
                    near_me
                </button>
            </form>
    </>
  );
};

export default RightSide;
