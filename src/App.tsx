import React from 'react';
import './App.css';
import Register from './components/Register/Register';
import { Routes, Route } from 'react-router-dom'
import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';
import Welcome from './components/Welcome/Welcome';


function App() {

  return <>
    <Routes>
      <Route path='/welcome' element={<Welcome/>}/>
      <Route path="/" element={<Register />} />
      <Route path='/login' element={<Login />} />
      <Route path='/dashboard' element={<Dashboard />} />


    </Routes>
  </>;
}

export default App;
