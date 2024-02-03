import React, { useEffect } from 'react';
import '../../styles/Dashboard.css';
import Table from '../../Components/Table';
import Navbar from '../../Components/Navbar';
// src/index.js or src/Dashboard.js
import '../../styles/tailwind.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from '../../Components/Sidebar';
import { useState } from 'react';
import UploadFile from '../../Components/UploadModal';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Form } from "react-bootstrap";
import Container from 'react-bootstrap/Container';
import UploadModal from '../../Components/UploadModal';
import { BASE_URL } from '../../config';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import io from 'socket.io-client';

const socket = io(BASE_URL)


function Dashboard() {
    const [isUploadModalOpen, setUploadModal] = useState(false)
    const [hostData, setHostData] = useState([])
    const [isScan, setScan] = useState(false)
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState({})
    const [agent, setAgent] = useState([])

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

    const fetchAgent = async () => {
        try {
            const token = localStorage.getItem('token')
            var res = await fetch(`${BASE_URL}/api/agent/get-my-agents`,
                {
                    method: "get",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                })
            if(!res.ok){
                const errorResponse = res.json()
                throw new Error(errorResponse)
            }
            res = res.json()
            setAgent(res)
            console.log(res) 
        } catch (err) {
            
        }

    }
    //Getting user data
    useEffect(() => {

        const userID = localStorage.getItem('user')
        console.log(userID)
        fetchAgent()

        fetch(`${BASE_URL}/api/user/${userID}`)
            .then((res) => {
                return res.json()
            })
            .then(res => {
                console.log(res)
                setUser(res)
            })
            .catch(err => {
                // toast.error("Failed to fetch user details.", {
                //     position: toast.POSITION.TOP_RIGHT,
                // });
                console.log(err)
            })


        socket.emit('user-login',(data)=>{
            console.log(data)
        })
    }, [user])
    return (
        <div className="Dashboard">
            <Navbar />
            <Sidebar onDataFetched={handleDataFetched} hostData={hostData} openUploadModal={openUploadModal} />
            <UploadModal
                show={isUploadModalOpen}
                onHide={closeUploadModal}
            />
            {/* <UploadFile isOpen={isUploadModalOpen} onclose={closeUploadModal}/> */}
            <Table data={hostData} agentList={agent}/>
        </div>
    );
}

export default Dashboard;

