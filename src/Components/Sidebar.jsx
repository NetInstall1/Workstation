import React, { useEffect } from 'react';
import { useState } from 'react';
import './Sidebar.css';
import 'font-awesome/css/font-awesome.min.css';
import { BASE_URL } from '../config';
import io from 'socket.io-client';
import UploadFile from './UploadModal';

// const socket = io('http://localhost:3000');

const Sidebar = ({onDataFetched, openUploadModal}) => {
  const [hostData, setHostData] = useState([])
  const [uploadModal, setUploadModal] = useState(false)

  
  const fetchHost = async()=>{
    console.log("In fetchhost function")
    try{
      var response = await fetch(`${BASE_URL}/api/scan`)
      response = await response.json()
      console.log(response)
      setHostData(response)
      onDataFetched(response)
    }
    catch(err){
      console.log(err)
    }
    
  }

  // useEffect(()=>{
  //   socket.on('host-updated', ()=>{
  //     fetchHost()
  //   })
  //   fetchHost()
  // },[])
  return (
    <nav id="sidebar" className="bg-light">
      <div className="p-4">
      <h4 className="text-center">
        {/* <i className="fa fa-angle-double-right"></i> */}
        </h4> {/* Use the Font Awesome icon */}
        <ul className="list-unstyled components">
          <li className="sidebar-option" onClick={fetchHost}>Scan</li>
          <li className="sidebar-option">Deploy</li>
          <li className="sidebar-option">Analytics</li>
          <li className="sidebar-option">Inventory</li>
          <li className='sidebar-option' onClick={openUploadModal}>Upload</li>
          <li className="sidebar-option">History</li>
         
         { /* <li className="sidebar-option">Option 6</li>
          <li className="sidebar-option">Option 7</li> */}
          {/* Add more options as needed */}
        </ul>
      </div>
    </nav>
  );
};

export default Sidebar;
