import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Route,Routes,Navigate,Link} from 'react-router-dom'

function App() {
  return (
    <>
    <div>
      <ul>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/posts'>Post Link</Link></li>
        <li><Link to='/posts/:id'>Post Detail List</Link></li>
        <li><Link to='/posts/new'>Post New Page</Link></li>
        <li><Link to='/posts/edit/:id'>Post edit page</Link></li>
        <li><Link to='/profile'>Profile</Link></li>
      </ul>
    </div>
    <Routes>
      <Route path='/' element={<h1>Hoem Page</h1>} />
      <Route path='/posts' element={<h1>Hoem Page</h1>} />
      <Route path='/posts/:id' element={<h1>post detail page</h1>} />
      <Route path='/posts/new' element={<h1>add new page</h1>} />
      <Route path='/posts/edit/:id' element={<h1>Hoem Detail Page</h1>} />
      <Route path='/profile' element={<h1>profile page</h1>} />
      <Route path='*' element={<Navigate replace to='/'/>} />
    </Routes>
    </>
  );
}

export default App;
