import React from 'react'
import { FaFacebook, FaInstagram, FaLinkedin, FaWhatsapp} from 'react-icons/fa';
const RightSideBar = () => {
  return (
    
          <div className=' bg-white hidden xl:flex xl:flex-col ml-6 border rounded-xl w-[22rem] h-[30rem] mt-3 drop-shadow-lg p-4 z-auto'>
              <h5 className='text-[1.5rem] mb-[1rem]'>Just Say Hi!</h5>
              <p className='text-[0.85rem] mb-[1rem]'>I am based in Gingoog City, Philippines <br /> You can contact me via the form or at cervantes.klc@gmail.com</p>
        
                  <div className='flex items-center mt-[1rem]'>
                    <div className='w-[30px] h-[30px] rounded-full bg-[#c5d9f8] text-[#fff] flex items-center justify-center mr-[1rem]'>
                    this icon
                    </div>
                    <p className='text-[0.85rem]'>THIS SIDE BAR</p>
                  </div>
        
              <div className='flex mt-5 space-x-3 text-[text-dark_primary]'>
                <a href='https://www.facebook.com/gugmapa/' target='_blank' rel="noreferrer"><FaFacebook  size={26}/></a>
               <a href='https://www.instagram.com/ayalageee/' target='_blank' rel="noreferrer"><FaInstagram size={26} /></a>
                <a href='https://www.linkedin.com/in/kenneth-cervantes' target='_blank' rel="noreferrer"><FaLinkedin size={26} /></a>
                <a href='#home'><FaWhatsapp  size={26}/></a>
              </div>
          </div>
  )
}

export default RightSideBar