import React from "react";
import Avatar from "../../Avatar";

import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { GLOBALTYPES } from "../../../redux/actions/globalTypes";
import { deletePost } from "../../../redux/actions/postAction";
import { BASE_URL } from "../../../utils/config";

import moment from "moment";
import "moment/locale/ko";

const CardHeader = ({ post }) => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  const history = useHistory()

  const handleDeletePost = () =>{
    if(window.confirm('게시물을 삭제하시겠습니까?'))
    dispatch(deletePost({post,auth}))

    return history.push('/')
  }

  const handleEditPost = () => {
    dispatch({ type: GLOBALTYPES.STATUS, payload: { ...post, onEdit: true } });
  };

  const handleCopyLink = ()=>{
    navigator.clipboard.writeText(`${BASE_URL}/post/${post._id}`)
  }
  return (
    <div className="card_header">
      <Link to={`/profile/${post.user._id}`} className="text-dark">
        <div className="d-flex">
          <Avatar src={[post.user.avatar]} size="big-avatar" />

          <div className="card_name ml-2">
            <h6 className="m-0">{post.user.fullname}</h6>
            <small className="text-muted">
              {moment(post.updatedAt).fromNow()}
            </small>
          </div>
        </div>
      </Link>

      <div className="nav-item dropdown">
        <span className="material-icons" id="moreLink" data-toggle="dropdown">
          more
        </span>

        <div className="dropdown-menu">
          {auth.user._id === post.user._id && (
            <>
              <div className="dropdown-item" onClick={handleEditPost}>
                <span className="material-icons">edit</span>
                포스터 수정
              </div>

              <div className="dropdown-item" onClick={handleDeletePost}>
                <span className="material-icons">delete</span>
                포스터 삭제
              </div>
            </>
          )}

          <div className="dropdown-item" onClick={handleCopyLink}> 
            <span className="material-icons">content_copy</span> 복사
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardHeader;
