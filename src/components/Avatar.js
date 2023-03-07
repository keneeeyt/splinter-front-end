import React from 'react'
import { useSelector } from 'react-redux'
const Avatar = ({src, size}) => {
    const { theme } = useSelector(state => state)
  return (
    <div className=''>
    <img
     className={`h-10 w-10 rounded-full avatar ${size} ${theme ? 'invert' : ''}`}
     src={src}
    alt="userAvatar"
     />
     </div>
  )
}

export default Avatar