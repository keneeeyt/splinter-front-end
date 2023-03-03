import React, { useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import  { useNavigate }  from 'react-router-dom';
import Logo from '../images/logo.png';
import { Link } from 'react-router-dom';
import { register } from '../redux/action/userAction';
const Register = () => {

  const { auth, notify } = useSelector(state => state)
 const navigate = useNavigate();
 const [typePass, setTypePass] = useState(false)
 const [typePassB, setTypePassB] = useState(false)
 const dispatch = useDispatch();
  const initialState = {
    fullName: '', userName: '', email: '', password:'', confirm_password:'', gender:'male'
  }
  const [userData, setUserData] = useState(initialState);
  const {fullName, userName, email, password, confirm_password} = userData

  const handleChange = (event) => {
    const {name, value} = event.target
    setUserData({...userData, [name]:value})
}

const handleSubmit = (event) => {
  event.preventDefault();
  
  dispatch(register(userData))
}


 useEffect(()=> {
  if(auth.token){
    navigate('/')
  }
 },[auth.token, navigate])
    
  return (
  
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                
              <Link to ='/' className="flex items-center justify-center">
                  <img  src={Logo} alt="logo" style={{width: '150px'}}/>   
              </Link>
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">

                <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                       <div>
                        <input onChange={handleChange} value={fullName} style={{background:`${notify.fullName ? '#fd2d6a14': '' }`}} type="text" name="fullName" className="block w-full px-4 py-2 mt-2  bg-white border rounded-md focus:border-[#F26F21] focus:ring-[#F89C1C] focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Enter Fullname"/>
                        <small className='text-red-300'>{notify.fullName ? notify.fullName : '' }</small>
                    </div>
                    <div>
                        
                        <input style={{background:`${notify.userName ? '#fd2d6a14': '' }`}} onChange={handleChange} value={userName.toLowerCase().replace(/ /s, '')} type="text" name="userName"  className="block w-full px-4 py-2 mt-2  bg-white border rounded-md focus:border-[#F26F21] focus:ring-[#F89C1C] focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Username" />
                        <small className='text-red-300'>{notify.userName ? notify.userName : '' }</small>
                    </div>
                    <div>
                        
                        <input style={{background:`${notify.email ? '#fd2d6a14': '' }`}} onChange={handleChange} value={email} type="email" name="email"  className="block w-full px-4 py-2 mt-2  bg-white border rounded-md focus:border-[#F26F21] focus:ring-[#F89C1C] focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Email"/>
                    </div>
                    <small className='text-red-300'>{notify.email ? notify.email : '' }</small>
                    <div className="mb-2 relative">
                        
                        <input style={{background:`${notify.password ? '#fd2d6a14': '' }`}} onChange={handleChange} value={password} type={typePass? 'text' : 'password'} name="password" id="password" placeholder="Password" className="block w-full px-4 py-2 mt-2  bg-white border rounded-md focus:border-[#F26F21] focus:ring-[#F89C1C] focus:outline-none focus:ring focus:ring-opacity-40"/>
                        <small onClick={() => setTypePass(!typePass)} className='absolute right-[10px] top-[50%] translate-y-[-50%] opacity-30 cursor-pointer'>
                            {typePass ? 'hide' : 'show'}
                        </small>
                        
                    </div>
                    <small className='text-red-300'>{notify.password ? notify.password : '' }</small>


                    <div className="mb-2 relative">
                       
                        <input  style={{background:`${notify.confirm_password ? '#fd2d6a14': '' }`}} onChange={handleChange} value={confirm_password} type={typePassB? 'text' : 'password'} name="confirm_password" id="confirm-password" placeholder="Confirm password" className="block w-full px-4 py-2 mt-2  bg-white border rounded-md focus:border-[#F26F21] focus:ring-[#F89C1C] focus:outline-none focus:ring focus:ring-opacity-40"/>
                        <small onClick={() => setTypePassB(!typePassB)} className='absolute right-[10px] top-[50%] translate-y-[-50%] opacity-30 cursor-pointer'>
                            {typePassB ? 'hide' : 'show'}
                        </small>
                        
                    </div>
                    <small className='text-red-300'>{notify.confirm_password ? notify.confirm_password : '' }</small>
                          <div className='radio-toolbar flex items-center justify-center space-x-[1px] md:space-x-[10px] mt-5'>
                      <input defaultChecked type='radio' id='male'  name='gender' className='-mr-2' value='male' onChange = {handleChange}
                     />
                      <label htmlFor='male'>Male</label>
                      <input type='radio' id='female' value='female' name='gender'   onChange = {handleChange}/>
                      <label htmlFor='female'>Female</label>
                           </div>

                           <h5 className='text-gray-500 dark:text-gray-400 text-center text-xs mt-5'> By creating an account, you agree to Splinter's <Link className='underline underline-offset-2 text-[#F26F21] '>Privacy Policy</Link> and <Link className='underline underline-offset-2 text-[#F26F21]'>Terms of Use</Link></h5>
                    <button type="submit" className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-[#F26F21] rounded-md hover:bg-[#F89C1C] focus:outline-none focus:bg-[#F26F21] disabled:opacity-30">Create an account</button>
                    <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                        Already have an account? <span className="font-medium text-primary-600 hover:underline dark:text-primary-500"><Link to='/login' className="font-medium text-[#F26F21] hover:underline">Login here</Link></span>
                    </p>
                </form>
            </div>
        </div>
    </div>

  
  )
}

export default Register
