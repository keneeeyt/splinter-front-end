import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getData } from '../../utils/fetchData';
import { TYPES } from '../../redux/action/notifyAction';
import { Link } from 'react-router-dom';
import UserCard from '../UserCard';

const Search = () => {

    const [search, setSearch] = useState('')

    const [users, setUsers] = useState([]);
    const { auth } = useSelector(state => state);
    const dispatch = useDispatch();

    useEffect(() => {
        if(search && auth.token){
            getData(`search?userName=${search}`, auth.token)
            .then(res => setUsers(res.data.users)) 
            .catch(err => {
                dispatch({type:TYPES, payload: {error: err.response.data.msg}})
            })
        }else {
            setUsers([])
        }
    },[search, auth.token, dispatch])

    const handleClose = () => {
        setSearch('')
        setUsers([])
    }
  return (
    
    <div className="flex items-center justify-center md:pl-5">
    <form className='mt-1'>
      <div className="relative text-gray-400 focus-within:text-gray-400">
        <span className="absolute inset-y-0 left-0 flex items-center pl-2">
          <button type="submit" className="p-1 focus:outline-none focus:shadow-outline absolute z-50">
            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" className="w-6 h-6"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          </button>
        </span>
        <div className={search ? `transition duration-300 flex justify-center items-center w-[218px] py-1  bg-white drop-shadow-lg` : ''}>
        
        <input value={search} onChange={e => setSearch(e.target.value.toLocaleLowerCase().replace(/ /s, ''))}  className="py-2 text-sm text-black bg-gray-100 rounded-full border-none pl-10 outline-none focus:ring-0 focus:text-gray-900 relative" placeholder="Search Splinter" autoComplete="off" />
            </div>
            <div onClick={handleClose} className='absolute top-[.1rem] text-2xl text-red-600 z-50 cursor-pointer left-[10.8rem]'style={{opacity: users.length===0 ? 0 : 1}}>
                &times;
            </div>
      </div>
                
      <div  className='users absolute w-[6%] min-w-[218px] bg-white'>
            { 
                 
               search && users.map(user => (
                    <Link key={user._id} to = {`/profile/${user._id}`} onClick={handleClose}>
                        <UserCard user={user} />
                    </Link>
                ))
                
                 
                   
            }
      </div>
    </form>
  </div>
  )
}

export default Search 