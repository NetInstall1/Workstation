import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'; // Import your CSS file if needed
import './styles/tailwind.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import Dashboard from './pages/Dashboard/Dashboard';
import SignIn from './pages/SignIn';
import CreateAgent from './pages/Dashboard/CreateAgent';
import TaskManager from './pages/Guest/TaskManager';
import GuestDashboard from './pages/Guest/GuestDashboard';
import SystemInfo from './pages/Guest/SystemInfo';
import CreateAgentModal from './pages/Dashboard/CreateAgentModal'
function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Routes>
        <Route path='/' element={<SignIn/>}></Route>
        <Route path='/dashboard' element={<Dashboard/>}></Route>
        <Route path='/createAgent'element={<CreateAgent />}></Route>
        <Route path='/taskmanager' element={<TaskManager/>}></Route>
        <Route path='/guestDashboard' element={<GuestDashboard/>}></Route>
        <Route path='/sysinfo'element={<SystemInfo />}></Route>
        <Route path='/CreateAgentModal'element={<CreateAgentModal/>}></Route>
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;

