import React, { useState } from 'react'
import Carousel from '../../Carousel'
const CardBody = ({post}) => {
const [readMore, setReadMore] = useState(false)


  return (
    <div className=''>
        <div className='body_card'>
        <div className='py-3'>
        <span>
        {
                post.content.length < 60? post.content :
                readMore ?  post.content + ' ' : post.content.slice(0, 60) + '...'
        }
        </span>
        {
          post.content.length > 60 && 
          <span className='readMore text-[#f89b15] cursor-pointer' onClick={() => setReadMore(!readMore)}>
            {
              readMore ? 'Hide content' : 'Read more'
            }
          </span>
        }
        </div>
        
        {
          post.images.length > 0 && <Carousel images={post.images} id={post._id} />
        }
       
        </div>
    </div>
  )
}

export default CardBody