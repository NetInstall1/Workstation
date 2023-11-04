import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'; // Import your CSS file if needed
import './styles/tailwind.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { useState } from 'react';
import Dashboard from './pages/Dashboard';
import SignIn from './pages/SignIn';
import CreateAgent from './pages/CreateAgent';


function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Routes>
        <Route path='/' element={<SignIn/>}></Route>
        <Route path='/dashboard' element={<Dashboard/>}></Route>
        <Route path='/createAgent'element={<CreateAgent />}></Route>
  
      </Routes>
    </div>
    </BrowserRouter>
    // <div>
    //   <Dashboard/>
    // </div>
  );
}

export default App;

