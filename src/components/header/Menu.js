import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../../redux/action/userAction'
import {TYPES} from '../../redux/action/notifyAction';
import Avatar from '../Avatar'
import NotifyModal from '../NotifyModal'

const Menu = () => {
   

    const { auth, theme, notify } = useSelector(state => state)
    const dispatch = useDispatch()
    const { pathname } = useLocation()

    const isActive = (pn) => {
        if(pn === pathname) return 'active'
    }

    return (
        <div className="menu">
            <ul className="navbar navbar-expand-lg navbar-light 
            bg-light justify-content-between align-middle text-justify">
                

                {/* <li className="nav-item dropdown" style={{opacity: 1}} >
                    <span className="nav-link position-relative" id="navbarDropdown" 
                    role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">

                        <span className="material-icons" 
                        style={{color: notify.data.length > 0 ? 'crimson' : ''}}>
                            favorite
                        </span>

                        <span className="notify_length">{notify.data.length}</span>

                    </span>

                    <div className="dropdown-menu" aria-labelledby="navbarDropdown"
                    style={{transform: 'translateX(75px)'}}>
                        <NotifyModal />
                    </div>
                        
                </li> */}
           
            
                <li className="nav-item dropstart" style={{opacity: 1}} >
                    <span className="nav-link" id="navbarDropdown" 
                    role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <Avatar src={auth.user.avatar} size="medium-avatar" />
                    </span>
                    
                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <Link className="dropdown-item hover:bg-[#f69e11]" to={`/profile/${auth.user._id}`}>Profile</Link>

                    <label htmlFor="theme" className="dropdown-item hover:bg-[#f69e11]"
                    onClick={() => dispatch({
                        type: TYPES.THEME, payload: !theme
                    })}>

                        {theme ? 'Light mode' : 'Dark mode'}
                    </label>

                    <Link className="dropdown-item hover:bg-[#f69e11]" to="/"
                    onClick={() => dispatch(logout())}>
                        Logout
                    </Link>
                </div>
            </li>
        </ul>
    </div>

    )
}

export default Menu