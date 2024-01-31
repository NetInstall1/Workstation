import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Dashboard.css'; // Import your CSS file if needed
import Table from '../Components/Table'; // Import the Table component
import Navbar from '../Components/Navbar';
import Sidebar from '../Components/Sidebar';
import { useState } from 'react';
import UploadModal from '../Components/UploadModal';
import { BASE_URL } from '../config';


function Dashboard() {
    const [isUploadModalOpen, setUploadModal] = useState(false)
    const [hostData, setHostData] = useState([])
    
    //navigation to login upon token expiry
    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/');
        } else {
            // Verify token validity
            fetch(`${BASE_URL}/validate-token`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                }
            })
            .then(res => {
                if (!res.ok) {
                    throw new Error('Token validation failed');
                }
                return res.json();
            })
            .then(data => {
                console.log('Token is valid:', data);
                // Proceed with dashboard logic
            })
            .catch(err => {
                console.error(err);
                navigate('/');
            });
        }
    }, [navigate]);

    //Upload Modal functions
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleUpload = () => {
        // Add code here to handle the file upload or silent installation
        console.log("Selected file:", selectedFile);
        // Replace the following command with your actual command for silent installation
        const silentInstallationCommand = "your-silent-installation-command";
        console.log("Silent Installation Command:", silentInstallationCommand);
    };
    const openUploadModal = () => {
        setUploadModal(true)
    }

    const closeUploadModal = () => {
        setUploadModal(false)
    }

    const handleLogout = () => {
        // Clear hostData on logout
        setHostData([]);
      
        // Clear the token from local storage
        localStorage.removeItem('token');
      
        // Navigate to the login page
        navigate('/');
      
        // Optionally, force a reload to ensure all state is cleared
        window.location.reload(true);
      };

    //Upload Modal end
    const handleDataFetched = (data) => {
        console.log("handleDataFetched")
        console.log(data)
        setHostData(data);
    };
    return (
        <div className="dashboard-container">
            <div className="navbar-container xdd">
            <Navbar onLogout={handleLogout}/>
            </div>
            
            <Sidebar onDataFetched={handleDataFetched} hostData={hostData} openUploadModal={openUploadModal} />
            
            <div className="main-content">
            <UploadModal show={isUploadModalOpen} onHide={closeUploadModal} />
            <Table data={hostData} />
             </div> 
            {/* <UploadFile isOpen={isUploadModalOpen} onclose={closeUploadModal}/> */}
        </div>
    );
}

export default Dashboard;

