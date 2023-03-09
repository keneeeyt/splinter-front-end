import React from 'react';
import Status from '../components/home/Status';
import Posts from '../components/home/Posts';
import { useSelector } from 'react-redux';
import LoadIcon from '../images/loading.gif';
import Header from '../components/header/Header';
import SideBar from '../components/home/SideBar';
import RightSideBar from '../components/home/RightSideBar';
const Home = () => {
  const { homePosts } = useSelector(state => state)
  return (
    <div className='container mt-[6rem] mx-auto'>
        
      <div className='gridHome'>
       
      <SideBar className='sidebar' />
        <div className='middleRow'>
          <Status />
          <div className='middleOverFlow'>
          {
            homePosts.loading
              ? <img src={LoadIcon} alt='loadingIcon' className='block mx-auto' />
              : homePosts.result === 0 ?
                <h2 className='text-center'>You have no post</h2>
                : <Posts />
          }

          </div>
         
      
        </div>
        <RightSideBar />
      </div>

    </div>

  )
}

export default Home