import React, { useEffect } from 'react';
import { useState } from 'react';
import '../styles/Sidebar.css';
import { Link } from 'react-router-dom';
import 'font-awesome/css/font-awesome.min.css';
import { BASE_URL } from '../config';
import io from 'socket.io-client';
import UploadFile from './UploadModal';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ onDataFetched, openUploadModal }) => {

  const navigate = useNavigate()
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
        <li className="sidebar-option" onClick={fetchHost}>
            <Link> 
              <i className="fa fa-tasks"></i>Scan
            </Link>
          </li>
          <li className="sidebar-option">
            <i className="fa fa-laptop"></i>Deploy
          </li>
          {/* <li className="sidebar-option">
            <i className="fa fa-camera"></i> Camera
          </li>
          <li className="sidebar-option">
            <i className="fa fa-hdd-o"></i> Filesystem
          </li> */}
          <li className='sidebar-option' onClick={openUploadModal}>
            <i className="fa fa-upload"></i> Upload
          </li>
          <li className='sidebar-option' onClick={()=>{navigate('/createAgent')}}>
          <i class="fa-solid fa-plus"></i> Create Agent
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Sidebar;
