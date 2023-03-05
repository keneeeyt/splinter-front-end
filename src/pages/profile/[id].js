import React from 'react'
import Info from '../../components/profile/Info';
import Posts from '../../components/profile/Posts';
import { useSelector } from 'react-redux';
import LoadIcon from '../../images/loading.gif'

const Profile = () => {
  const { profile } = useSelector(state => state)
  return (
    <div className=''>
    
    {
      profile.loading
      ? <img className='block mx-auto my-4' src={LoadIcon} alt='loading' style={{width: '50px'}}/>
      :<Info />
    }
        
        <Posts />
    </div>
  )
}

export default Profile