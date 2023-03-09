import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from '../../images/iconHome.png';


import { useSelector, useDispatch } from 'react-redux';
import { RiCompassDiscoverLine, RiNotification3Line } from 'react-icons/ri';
import { TbSmartHome } from 'react-icons/tb'
import { BiMessage } from 'react-icons/bi';


import Search from './Search';
import Menu from './Menu';

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const Header = () => {

  const navLinks = [
    { label: "Home", icon: <TbSmartHome size={24} />, path: '/', current: true },
    { label: "Message", icon: <BiMessage size={24} />, path: '/message', current: false },
    { label: "Discover", icon: <RiCompassDiscoverLine size={24} />, path: '/discover', current: false },
    { label: "notify", icon: <RiNotification3Line size={24} />, path: '/notify', current: false }
]
  const { auth, theme } = useSelector(state => state)
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const isActive = (pn) => {
    if (pn === pathname) return 'active'
  }
  return (
     <div className="header bg-white drop-shadow-lg fixed w-full z-50">
            <nav className="navbar navbar-expand-lg navbar-light 
            bg-light justify-content-between align-middle">
                   <div className="nav-item dropdown" style={{opacity: 1}} >
                        
                        <div className='hidden lg:flex'>
                        <Link to='/'>
                        <img src={Logo} style={{width:'40px'}} onClick={() => window.scrollTo({top: 0})}/>
                        </Link>
                        </div>
                    <div className="nav-link lg:hidden" id="navbarDropdown" 
                    role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <span className="navbar-toggler-icon"></span>
                     </div>

                  <div className="dropdown-menu " aria-labelledby="navbarDropdown" id='navbarNavDropdown'>
                    <Link className="dropdown-item hover:bg-[#f69e11]" to={`/`}>Home</Link>
                    <Link className="dropdown-item hover:bg-[#f69e11]" to={`/message`}>Messages</Link>
                    <Link className="dropdown-item hover:bg-[#f69e11]" to={`/discover`}>Discover</Link>
                    

                    
                    <Link className="dropdown-item hover:bg-[#f69e11]" to="/notify">
                        Notification
                    </Link>
                </div>
            </div>
                <div className='flex lg:flex-1'>
                <Search />
                </div>
        
                <ul className="navbar-nav lg:flex lg:flex-row flex-1 lg:mr-[252px] md:ml-[10px] hidden space-x-10">
        
                {
                    navLinks.map((link, index) => (
                        <li className={`nav-item px-2 ${isActive(link.path)}`} key={index}>
                            <Link className="nav-link" to={link.path}>
                                <span className="text-gray-700">{link.icon}</span>
                            </Link>
                        </li>
                    ))
                }
                </ul>

                <Menu />
            </nav>
        </div>
  );
}



export default Header