
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Login from './pages/login';
import PageRender from './PageRender';

function App() {
  return (
    <Router>
    <input type='checkbox' id='theme' />
    <div className="App">
      <div className='main max-w-[1000px] w-[100%] m-auto'>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path="/:page" element={<PageRender />} />
          <Route path="/:page/:id" element={<PageRender />} />
        </Routes>
      </div>
    </div>
    </Router>
  );
}

export default App;
