import React from 'react';
import { Link, useLocation} from 'react-router-dom';
import Logo from '../images/icon.png';
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import { TbSmartHome } from 'react-icons/tb'
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/action/userAction';
import { BiMessage } from 'react-icons/bi';
import { RiCompassDiscoverLine, RiNotification3Line } from 'react-icons/ri';
import { TYPES } from '../redux/action/notifyAction';
import Avatar from './Avatar';


function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const Header = () => {

  const navigation = [
    { label: "Home", icon: <TbSmartHome size={24} />, path:'/' , current:false},
    { label: "Message", icon: <BiMessage size={24} />, path: '/message', current:false },
    { label: "Discover", icon: <RiCompassDiscoverLine size={24} />, path: '/discover', current:false },
    { label: "notify", icon: <RiNotification3Line size={24} />, path: '/notify', current:false }
  ];

  const { auth, theme } =useSelector(state => state)
  console.log(auth)
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const isActive = (pn) => {
    if(pn === pathname) return 'active'
  }
  return (
    <Disclosure as="nav" className='bg-[#fff] drop-shadow-sm'>
      {({ open }) => (
        <>
          <div className="max-w-8xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-[#F89C1C] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex-shrink-0 flex items-center">
                <Link to = '/'>
                  <img
                    className="hidden lg:inline-block h-9 w-auto"
                    src={Logo}
                    alt="Workflow"
                    style={{width: '50px', height: 'auto', filter:`${theme ? 'invert(1)' : 'invert(0)'}`}}
                  />
                  </Link>
                </div>
                <div>
            
                <div className="flex items-center justify-center md:pl-5">
                <form className='mt-1'>
                  <div className="relative text-gray-400 focus-within:text-gray-400">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                      <button type="submit" className="p-1 focus:outline-none focus:shadow-outline">
                        <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" className="w-6 h-6"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                      </button>
                    </span>
                    <input type="search" name="q" className="py-2 text-sm text-white bg-gray-100 rounded-full border-none pl-10 outline-none focus:ring-0 focus:text-gray-900" placeholder="Search Splinter" autoComplete="off" />
                  </div>
                </form>
              </div>


                </div>
                
              </div>
              <div className="hidden sm:block sm:ml-6">
                    
                  <ul className="absolute left-[40%] top-[10px] w-full flex">
                    {
                      navigation.map((link,index) => (
                        <li className={`hover:bg-gray-100 px-6 lg:px-10 py-2 rounded-lg  ${isActive(link.path)}`} key={index}>
                            <Link to={link.path} className={ isActive(link.path)=== 'active' ? 'text-[#F89C1C]' : 'text-gray-400'} style={{filter:`${theme ? 'invert(1)' : 'invert(0)'}`}}>
                             {link.icon}
                            </Link>
                        </li>
                    ))
                    }

                  </ul>
                
                </div>
              <div>

              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {/* Profile dropdown */}
                <Menu as="div" className="ml-3 relative">
                  <div>
                    <Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#F26F21] focus:ring-white">
                      <span className="sr-only">Open user menu</span>
                      <Avatar src={auth.user.avatar} />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                     
                        {({ active }) => (
                          
                           <Link to = {`/profile/${auth.user._id}`}
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                          
                            Your Profile
                            </Link>
                           
                        )}
                    
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <label htmlFor='theme'
                           
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                            onClick={()=> dispatch({type: TYPES.THEME, payload: !theme })}
                          >
                          
                            {theme ? 'Light mode' : 'Dark mode'}
                            
                          </label>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to = '/'
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            Settings
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            href="#"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}

                            onClick={() => dispatch(logout())}
                          >
                            Sign out
                          </Link>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="absolute w-full z-50 sm:hidden bg-[#fff]">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.label}
                  as="a"
                  href={item.path}
                  className={classNames(
                    item.current
                      ? "bg-[#F26F21] text-white"
                      : "text-gray-500 hover:bg-[#F26F21] hover:text-white",
                    "block px-3 py-2 rounded-md text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.label}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}



export default Header