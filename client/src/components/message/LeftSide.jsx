import React, { useState, useEffect, useRef } from "react";
import UserCard from "../UserCard";
import { useSelector, useDispatch } from "react-redux";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";
import { getDataAPI } from "../../utils/fetchData";
import { useHistory, useParams } from "react-router-dom";
import { MESS_TYPES, getConversations } from "../../redux/actions/messageAction";

const LeftSide = () => {
  const { auth, message } = useSelector((state) => state);
  const { id } = useParams();

  const [search, setSearch] = useState("");
  const [searchUsers, setSearchUsers] = useState([]);

  const dispatch = useDispatch();

  const history = useHistory();
  
  const pageEnd = useRef()
  const [page, setPage] = useState(0)
  // 유저 검색
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!search) return;
    try {
      const res = await getDataAPI(`search?username=${search}`, auth.token);
      setSearchUsers(res.data.users);
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: err.response.data.msg },
      });
    }
  };

  //유저 추가
  const handleAddUser = (user) => {
    setSearch("");
    setSearchUsers([]);
    dispatch({ type: MESS_TYPES.ADD_USER, payload: user });
    return history.push(`/message/${user._id}`);
  };

  const isActive = (user) => {
    if (id === user._id) return "active";
    return "";
  };

  // getConversation
  useEffect(() => {
    if (message.firstLoad) return;
    dispatch(getConversations({ auth }));
  }, [dispatch, auth, message.firstLoad]);

  //setPage 생성
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

  // endpage시 작동
  useEffect(() =>{
    if(message.resultUsers >= (page -1) *9 && page >1){
      dispatch(getConversations({auth,page}))
    }
  },[message.resultUsers, page ,auth, dispatch])

  return (
    <>
      <form className="message_header" onSubmit={handleSearch}>
        <input
          type="text"
          value={search}
          placeholder="검색해주세요"
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit" style={{ display: "none" }}>
          찾기
        </button>
      </form>

      <div className="message_chat_list">
        {searchUsers.length !== 0 ? (
          <>
            {searchUsers.map((user) => (
              <div
                key={user._id}
                className={`message_user ${isActive(user)}`}
                onClick={() => handleAddUser(user)}
              >
                <UserCard user={user} />
              </div>
            ))}
          </>
        ) : (
          <>
            {message.users.map((user) => (
              <div
                key={user._id}
                className={`message_user ${isActive(user)}`}
                onClick={() => handleAddUser(user)}
              >
                <UserCard user={user} msg={true}>
                  <i className="fas fa-circle" />
                </UserCard>
              </div>
            ))}
          </>
        )}
        <button ref={pageEnd} style={{opacity:0}}>더보기</button>
      </div>
    </>
  );
};

export default LeftSide;
