import React from 'react';
import '../styles/Dashboard.css'; // Import your CSS file if needed
import Table from '../Components/Table'; // Import the Table component
import Navbar from '../Components/Navbar';
// src/index.js or src/Dashboard.js
import '../styles/tailwind.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from '../Components/Sidebar';
import { useState } from 'react';
import UploadFile from '../Components/UploadModal';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Form } from "react-bootstrap";
import Container from 'react-bootstrap/Container';
import UploadModal from '../Components/UploadModal';
import AgentList from '../Components/AgentList';

function Dashboard() {
    const [isUploadModalOpen, setUploadModal] = useState(false)
    const [hostData, setHostData] = useState([])


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

    //Upload Modal end
    const handleDataFetched = (data) => {
        console.log("handleDataFetched")
        console.log(data)
        setHostData(data);
    };
    return (
        <div className="Dashboard">
            <Navbar />
            <AgentList/>
            <Sidebar onDataFetched={handleDataFetched} hostData={hostData} openUploadModal={openUploadModal} />
            <UploadModal
                show={isUploadModalOpen}
                onHide={closeUploadModal}
            />
            {/* <UploadFile isOpen={isUploadModalOpen} onclose={closeUploadModal}/> */}
            <Table data={hostData} />
        </div>
    );
}

export default Dashboard;

