
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Login from './pages/login';
import PageRender from './PageRender';
import Notify from './components/notify/Notify';
import { useSelector, useDispatch } from 'react-redux';
import Home from './pages/home';
import { useEffect } from 'react';
import { refreshToken } from './redux/action/userAction';
import Header from './components/Header';
import Footer from './components/Footer';


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
          <Route path="/:page" element={<PageRender />} />
          <Route path="/:page/:id" element={<PageRender />} />
        </Routes>
        {!auth.token && <Footer />}
      </div>
    </div>
    </Router>
  );
}

export default App;
