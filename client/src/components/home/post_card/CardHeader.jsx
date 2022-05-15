import React from "react";
import Avatar from "../../Avatar";

import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { GLOBALTYPES } from "../../../redux/actions/globalTypes";

import moment from "moment";

const CardHeader = ({ post }) => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  // const handleDeletePost = () =>{
  //   if(window.confirm('게시물을 삭제하시겠습니까?'))
  //   dispatch(deletePost)
  // }

  const handleEditPost = () => {
    dispatch({type: GLOBALTYPES.STATUS, payload: {...post, onEdit : true}})
  };
  return (
    <div className="card_header">
      <div className="d-flex">
        <Avatar src={[post.user.avatar]} size="big-avatar" />

        <div className="card_name">
          <h6 className="m-0">
            <Link to={`/profile/${post.user._id}`} className="text-dark">
              {post.user.fullname}
            </Link>
          </h6>
          <small className="text-muted">{moment(post.create).fromNow()}</small>
        </div>
      </div>
      <div className="nav-item dropdown">
        <span className="material-icons" id="moreLink" data-toggle="dropdown">
          more_horiz
        </span>

        <div className="dropdown-menu">
          {auth.user._id === post.user._id && (
            <>
              <div className="dropdown-item" onClick={handleEditPost}>
                <span className="material-icons">edit</span>
                포스터 수정
              </div>

              <div className="dropdown-item">
                <span className="material-icons">delete</span>
                포스터 삭제
              </div>
            </>
          )}

          <div className="dropdown-item">
            <span className="material-icons">content_copy</span> 복사
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardHeader;