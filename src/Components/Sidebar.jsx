import React, { useEffect } from 'react';
import { useState } from 'react';
import '../styles/Sidebar.css';
import { Link } from 'react-router-dom';
import 'font-awesome/css/font-awesome.min.css';
import { BASE_URL } from '../config';
import io from 'socket.io-client';
import UploadFile from './UploadModal';

const Sidebar = ({ onDataFetched, openUploadModal }) => {
  const [hostData, setHostData] = useState([]);
  const [uploadModal, setUploadModal] = useState(false);

  const fetchHost = async () => {
    console.log("In fetchhost function");
    try {
      var response = await fetch(`${BASE_URL}/scan`);
      response = await response.json();
      console.log(response);
      setHostData(response);
      onDataFetched(response);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <nav id="sidebar" className="bg-light">
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
            <Link to="/taskmanager"> 
              <i className="fa fa-tasks"></i> Task Manager
            </Link>
          </li>
          <li className="sidebar-option">
            <i className="fa fa-laptop"></i> System Information
          </li>
          <li className="sidebar-option">
            <i className="fa fa-camera"></i> Camera
          </li>
          <li className="sidebar-option">
            <i className="fa fa-hdd-o"></i> Filesystem
          </li>
          <li className='sidebar-option' onClick={openUploadModal}>
            <i className="fa fa-upload"></i> Upload
          </li>
          <li className="sidebar-option">
            <i className="fa fa-terminal"></i> Terminal
          </li>
         
         { /* <li className="sidebar-option">Option 6</li>
          <li className="sidebar-option">Option 7</li> */}
          {/* Add more options as needed */}
        </ul>
      </div>
    </nav>
  );
};

export default Sidebar;
