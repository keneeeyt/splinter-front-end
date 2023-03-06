
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Login from './pages/login';
import PageRender from './PageRender';
import Notify from './components/notify/Notify';
import { useSelector, useDispatch } from 'react-redux';
import Home from './pages/home';
import { useEffect } from 'react';
import { refreshToken } from './redux/action/userAction';
import Header from './components/header/Header';
import Footer from './components/Footer';
import Register from './pages/register';

import { Navigate } from 'react-router-dom';

function App() {
  const { auth } = useSelector(state => state)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshToken())
  },[dispatch])


  
  return (
    <Router>

    <Notify />
    <input type='checkbox' id='theme' />
    <div className="App">
    {auth.token && <Header />}
      <div className='main max-w-[1500px] w-[100%] m-auto'>
        
        <Routes>
          <Route path='/' element={auth.token ? <Home /> : <Login />} />
          <Route path='/register' element={<Register />} />
          <Route path="/:page" element={auth.token  ? <PageRender /> : <Navigate to = '/' />} />
          <Route path="/:page/:id" element={auth.token ? <PageRender /> : <Navigate to = '/' />} />
        </Routes>
        {!auth.token && <Footer />}
      </div>
    </div>
    </Router>
  );
}

export default App;
