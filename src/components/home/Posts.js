import React from 'react'
import { useSelector } from 'react-redux';
import CardBody from './postCard/CardBody'
import CardHeader from './postCard/CardHeader'
import CardFooter from './postCard/CardFooter'

const Posts = () => {
  const { homePosts } = useSelector(state => state)

  return (
    <div className='mt-1'>
      {
        homePosts.posts.map(post => (
          <div key={post._id} className='bg-white border rounded-xl md:w-[35rem] w-[24rem] mx-auto mt-3 drop-shadow-lg px-4'>
            <CardHeader post={post}/>
            <CardBody post={post} />
            <CardFooter post={post} />
          </div>
        ))
      }
    </div>
  )
}

export default Posts