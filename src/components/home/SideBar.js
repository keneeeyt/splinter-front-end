import React from 'react'
import { FaFacebook, FaInstagram, FaLinkedin, FaWhatsapp} from 'react-icons/fa';
import { useSelector } from 'react-redux';
import {IoLocationOutline} from 'react-icons/io5';
import {CgWebsite} from 'react-icons/cg';
import {BiLinkAlt} from 'react-icons/bi'
const SideBar = () => {
    const {auth} = useSelector(state => state)
  return (
    
          <div className='sidebar bg-white hidden lg:flex lg:flex-col border rounded-xl w-[22rem] h-[30rem] mx-auto mt-3 drop-shadow-lg p-4'>
                <div className='flex items-center justify-center space-x-5'>
                    <div>
                        <img src={auth.user.avatar} className='w-[70px] rounded-full'/>
                    </div>
                    <div>
                        <p className='font-medium'>{auth.user.fullName}</p>
                        <div className='space-x-3'>
                        <small>{auth.user.followers.length} Followers</small>
                        <small>{auth.user.following.length} Following</small>
                        </div>
                    </div>
                </div>
                <hr className='h-px my-8 bg-gray-200 border-0 dark:bg-gray-700 mt-3'/>
                <div className='space-y-3'>
                    <div className='flex items-center justify-start gap-8'>
                        
                        <IoLocationOutline className='text-[25px] text-gray-800'/>
                        
                        <p>{auth.user.address}</p>
                    </div>
                    <div className='flex items-center justify-start gap-8'>
                        <BiLinkAlt className='text-[25px] text-gray-800'/>
                        <p className='text-blue-500 hover:underline cursor-pointer'>{auth.user.website}</p>
                    </div>
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

export default SideBar