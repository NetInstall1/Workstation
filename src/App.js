import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'; 
import './styles/tailwind.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dashboard from './pages/Dashboard/Dashboard';
import SignIn from './pages/SignIn';
import CreateAgent from './pages/Dashboard/CreateAgent';
import TaskManager from './pages/Guest/TaskManager';
import GuestDashboard from './pages/Guest/GuestDashboard';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Routes>
        <Route path='/' element={<SignIn/>}></Route>
        <Route path='/dashboard' element={<Dashboard/>}></Route>
        <Route path='/createAgent'element={<CreateAgent />}></Route>
        {/* <Route path='/taskmanager' element={<TaskManager/>}></Route> */}
        <Route path='/guest/:guestIp' element={<GuestDashboard/>}></Route>
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;

