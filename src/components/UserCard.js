import React from 'react'
import Avatar from './Avatar';

const UserCard = ({user, border}) => {
  return (
    <div className={`flex items-center p-2 ${border}`}>
        <Avatar src={user.avatar} size='' />
        <div className='ml-1' style={{transform: 'translateY(-2px)'}}>
            <span className='block'>{user.userName}</span>
            <small style={{opacity: 0.7}}>{user.fullName}</small>
        </div>
    </div>
  )
}

export default UserCard