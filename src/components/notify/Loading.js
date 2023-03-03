import React from 'react'

const Loading = () => {
  return (
    <div className='fixed w-full h-full text-center loading' style={{background: '#0008', color:"white", top: 0, left:0, zIndex:50}}>
    
       <svg height='280' width="280">
        <circle cx="140" cy="75" r="70" stroke="#fff" strokeWidth="5" fill="none" />
        <text className='text-[39px]' fill='#fff' x='60' y='200'>Loading</text>
    </svg>

    </div>
  )
}

export default Loading