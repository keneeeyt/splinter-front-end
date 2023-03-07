import React from 'react';
import Status from '../components/home/Status';
import Posts from '../components/home/Posts';

const Home = () => {
  return (
    <div className='home grid grid-row-1 mx-0'>
        <Status />
        <Posts />
    </div>
  )
}

export default Home