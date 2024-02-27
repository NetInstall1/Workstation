import React from 'react';
import { useState } from 'react';
import '../styles/Sidebar.css';
import { Link } from 'react-router-dom';
import 'font-awesome/css/font-awesome.min.css';
import { BASE_URL } from '../config';
import UploadFile from './UploadModal';
import { useNavigate } from 'react-router-dom';
import DeployModal from './DeployModal';
import UploadModal from './UploadModal';


const Sidebar = ({ onDataFetched, openUploadModal, uploadedFileId }) => {

  const navigate = useNavigate()
  const [hostData, setHostData] = useState([]);
  const [uploadModal, setUploadModal] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showDeployModal, setShowDeployModal] = useState(false);

    // Function to open DeployModal
    const openDeployModal = () => {
        setShowDeployModal(true);
    };
    

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen); // Toggle the state to open/close the sidebar
  };

  const handleDeploy = async () => {
    try {
        const response = await fetch(`${BASE_URL}/guest-ip-addresses`);
        const ipAddresses = await response.json();

        const deployResponse = await fetch(`${BASE_URL}/api/deploy`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ip_addresses: ipAddresses })
        });

        const deployData = await deployResponse.json();
        console.log(deployData.message);
    } catch (error) {
        console.error('Error during deployment:', error);
    }
};


  const fetchHost = async () => {
    console.log("In fetchhost function");
    try {
      var response = await fetch(`${BASE_URL}/api/scan`);
      response = await response.json();
      console.log(response);
      setHostData(response);
      onDataFetched(response);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
    {/* Hamburger Menu Icon */}
    <div className="hamburger-menu" onClick={toggleSidebar}>
      <i className={`fa fa-${isSidebarOpen ? 'times' : 'bars'}`}></i>
    </div>
    <nav id="sidebar" className={`bg-light ${isSidebarOpen ? 'open' : ''}`}>   
       <div className="sidecss">
        <h4 className="text-center">
        <div style={{ textAlign: 'center', marginBottom: '85px' }}>
         <div style={{ border: '2px solid grey', borderRadius: '50%', width: '70px', height: '70px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'grey' }}>
    <i className="fa fa-user" style={{ fontSize: '40px', color: 'black' }}></i>
                 </div>
           <p style={{ margin: '15px', fontSize: '20px', textAlign: 'center' }}>XGE,102</p>
                    </div>
                    </h4> 
        <ul className="list-unstyled components">
        <li className="sidebar-option" onClick={fetchHost}>
            <Link> 
              <i className="fa fa-tasks"></i>Scan
            </Link>
          </li>
          <li className="sidebar-option" onClick={openDeployModal}>
            <i className="fa fa-laptop"></i>Deploy
          </li>
          <DeployModal
    show={showDeployModal}
    onHide={() => setShowDeployModal(false)}
    fileId={uploadedFileId} // Pass the uploaded file ID
/>
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
    </>
  );
};

export default Sidebar;
