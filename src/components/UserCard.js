import React from 'react'
import Avatar from './Avatar';
import { Link } from 'react-router-dom'

const UserCard = ({children,user, border, handleClose, setShowFollowers, setShowFollowing}) => {

    const handleCloseAll = () => {
        if(handleClose) handleClose()
        if(setShowFollowers) setShowFollowers(false)
        if(setShowFollowing) setShowFollowing(false)
    }
  return (
    <div className={`flex items-center p-2 justify-between mr-5 ${border}`}>
        <div>
            <Link to = {`/profile/${user._id}`} onClick={handleCloseAll} className='flex items-center'>
            <Avatar src={user.avatar} size='' />

                <div className='ml-1' style={{transform: 'translateY(-2px)'}}>
                    <span className='block'>{user.userName}</span>
                    <small style={{opacity: 0.7}}>{user.fullName}</small>
                </div>
            </Link>
        </div>
        {children}
    </div>
  )
}

export default UserCard