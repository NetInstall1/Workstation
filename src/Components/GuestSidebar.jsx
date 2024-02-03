import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Sidebar.css'; // Import the same CSS file used for Sidebar
import 'font-awesome/css/font-awesome.min.css';

const GuestSidebar = ({ onDataFetched, openUploadModal }) => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen); // Toggle the state to open/close the sidebar
  };

  return (
    <>
    {/* Hamburger Menu Icon */}
    <div className="hamburger-menu" onClick={toggleSidebar}>
    <i className={`fa fa-${isSidebarOpen ? 'times' : 'bars'}`}></i>
  </div>
  <nav id="sidebar" className={`bg-light ${isSidebarOpen ? 'open' : ''}`}>
      <div className="p-4">
        <h4 className="text-center">
          <div style={{ textAlign: 'center', marginBottom: '85px' }}>
            <div style={{ border: '2px solid grey', borderRadius: '50%', width: '70px', height: '70px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'grey' }}>
              <i className="fa fa-user" style={{ fontSize: '40px', color: 'black' }}></i>
            </div>
            <p style={{ margin: '0', fontSize: '16px', textAlign: 'center' }}>XGE,102</p>
          </div>
        </h4>
        <ul className="list-unstyled components">
          <li className="sidebar-option">
            <Link to="/dashboard">
              <i className="fa-solid fa-house"></i> Dashboard
            </Link>
          </li>
          <li className="sidebar-option">
              <i className="fa fa-tasks"></i> System Information
          </li>
          <li className="sidebar-option" onClick={() => navigate('/taskManager')}>
            <i className="fa fa-laptop"></i> Task Manager
          </li>
          <li className="sidebar-option">
            <i className="fa fa-hdd-o"></i> Filesystem
          </li>
          <li className="sidebar-option">
            <i className="fa fa-terminal"></i> Terminal
          </li>
          {/* Additional options here */}
        </ul>
      </div>
    </nav>
    </>
  );
};

export default GuestSidebar;
