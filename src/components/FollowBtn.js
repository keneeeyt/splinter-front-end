
import React, {useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { follow, unfollow } from '../redux/action/profileAction'





const FollowBtn = ({user}) => {
    
const [followed, setFollowed] = useState(false)

const { auth, profile } = useSelector(state => state)
const dispatch = useDispatch()
const [load, setLoad] = useState(false)


useEffect(() => {
        if(auth.user.following.find(item => item._id === user._id)){
            setFollowed(true)
        }
},[auth.user.following, user._id])




const handleFollow = async() => {
    if(load) return;
    setFollowed(true)
    setLoad(true)
   await dispatch(follow({users: profile.users, user,auth}))
   setLoad(false)
}
const handleUnfollow = async () => {
    if(load) return;
    setFollowed(false)
    setLoad(true)
   await dispatch(unfollow({users: profile.users, user,auth}))
   setLoad(false)
}



  return (
    <>
        {
            followed ? <button onClick={handleUnfollow} className="bg-red-400 px-2 hover:bg-red-500 py-1 
    text-white font-semibold text-sm rounded  text-center 
    sm:inline-block block">Following</button>
                :
                <button onClick={handleFollow} className="bg-[#F37223] px-2 hover:bg-[#F89C1C] py-1 
    text-white font-semibold text-sm rounded  text-center 
    sm:inline-block block">Follow</button>
        }
    </>
  )
}

export default FollowBtn