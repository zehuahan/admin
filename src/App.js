import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Admin from './pages/admin';
import Login from './pages/login';

export default class App extends React.Component {
  render() {
    return(
      <Router>
        <Routes>
          <Route path='/login' element={<Login/>}/>
          <Route path='/' element={<Admin/>}/>
        </Routes>
      </Router>
    )
  }
};