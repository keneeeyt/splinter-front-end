import React from 'react'
import { useSelector } from 'react-redux'
const Avatar = ({src}) => {
    const { theme } = useSelector(state => state)
  return (
    <img
     className="h-10 w-10 rounded-full avatar"
     src={src}
    alt="userAvatar"

    style={{filter:`${theme ? 'invert(1)' : 'invert(0)'}`}}
     />
  )
}

export default Avatar