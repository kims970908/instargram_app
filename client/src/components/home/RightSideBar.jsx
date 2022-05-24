import React from 'react'

import { useSelector, useDispatch } from 'react-redux'

import UserCard from '../UserCard'
import FollowBtn from '../FollowBtn'
import LoadIcon from '../../images/loading.gif'

import {getSuggestions} from '../../redux/actions/suggestionsAction'

const RightSideBar = () => {
  const {auth, suggestions} = useSelector(state => state)
  const dispatch = useDispatch()
  return (
    <div>
      <UserCard user={auth.user} />

      <div className="d-flex justify-content-between align-items-center">
        <h5 className='text-danger'>팔로우 추천</h5>
        {
          !suggestions.loading &&
          <i className="fas fa-redo" style={{cursor : 'pointer'}}
          onClick={()=> dispatch(getSuggestions(auth.token))} />

        }
      </div>

      {
        suggestions.loading
        ? <img src={LoadIcon} alt="loading" className='d-block mx-auto my-4' />
        : <div className="suggestions">
          {
            suggestions.users.map(user=>(
              <UserCard key={user._id} user={user}>
                <FollowBtn user={user} />
              </UserCard>
            ))
          }
        </div>
      }
      <div className="my-2">
        <a href="https://www.google.com" target='_blank' rel='noreferrer' style={{wordBreak: 'break-all'}}>
          google
        </a>
        <small className="d-block">
          footer 작성중에요
        </small>

        <small>
          &copy; copyright by 쓰고
        </small>
      </div>
    </div>
  )
}

export default RightSideBar