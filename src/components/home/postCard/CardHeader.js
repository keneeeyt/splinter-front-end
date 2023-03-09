import React from 'react'
import Avatar from '../../Avatar'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import moment from 'moment'
import { MdDeleteOutline } from 'react-icons/md';
import { FiEdit, FiCopy } from 'react-icons/fi';

import { HiOutlineDotsCircleHorizontal } from 'react-icons/hi';
import {TYPES} from '../../../redux/action/notifyAction';



const CardHeader = ({ post }) => {

  const { auth } = useSelector(state => state)
  const dispatch = useDispatch();

  const handleEditPost =() => {
   
      dispatch({type: TYPES.STATUS, payload: {...post, onEdit: true}})
  }
  const handleDeletePost =() => {
    
  }
  const handleCopyLink =() => {
    
  }
  return (
    <div className='mt-3'>
      <div className="-ml-4 flex items-center px-4 relative">
        <Avatar src={post.user.avatar} />
        <div className="ml-3">
          <span className="text-sm font-semibold antialiased block leading-tight"><Link to={`profile/${post.user._id}`}>{post.user.userName}</Link></span>
          <span className="text-gray-600 text-xs block">{moment(post.createdAt).fromNow()}</span>
        </div>

        <div className='ml-[89%] absolute'>
          {/* DROP DOWN */}
          <div className="nav-item dropleft">
                <span className="material-icons cursor-pointer" id="moreLink" data-toggle="dropdown">
                    <HiOutlineDotsCircleHorizontal className='text-[25px] text-gray-800'/>
                </span>

                <div className="dropdown-menu space-y-2">
                    {
                        auth.user._id === post.user._id &&
                        <>
                            <div className="dropdown-item flex justify-start items-center gap-6" onClick={handleEditPost}>
                                <span className="material-icons text-[19px] md:text-[23px] text-gray-800"><FiEdit /></span> Edit Post
                            </div>
                            <div className="dropdown-item flex justify-start items-center gap-6" onClick={handleDeletePost} >
                                <span className="material-icons text-[19px] md:text-[23px] text-gray-800"><MdDeleteOutline /></span> Remove Post
                            </div>
                        </>
                    }

                    <div className="dropdown-item flex justify-start items-center gap-6" onClick={handleCopyLink}>
                        <span className="material-icons text-[19px] md:text-[23px] text-gray-800"><FiCopy /></span> Copy Link
                    </div>
                </div>
                </div>




        </div>

      </div>

    </div>
  )
}

export default CardHeader