import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import '../styles/GuestDashboard.css'; 
import { BASE_URL } from '../config';
import Sidebar from '../Components/Sidebar';

const GuestDashboard = () => {
    const [guestInfo, setGuestInfo] = useState(null);
    const { guestIp } = useParams();
    const [hostData, setHostData] = useState([])

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
            })
            .catch(err => {
                console.error(err);
                navigate('/');
            });
        }
    }, [navigate]);

    const handleLogout = () => {
        // Clear hostData on logout
        setHostData([]);
      
        // Clear the token from local storage
        localStorage.removeItem('token');
      
        // Navigate to the login page
        navigate('/');
      
        window.location.reload(true);
      };

    useEffect(() => {
        fetch(`${BASE_URL}/guestInfo/${guestIp}`)
            .then(response => response.json())
            .then(data => {
                setGuestInfo(data);
                console.log('Fetched Guest Info:', data);
            })
            .catch(error => console.error('Error:', error));
    }, [guestIp]);

    return (
    <div className="guest-dashboard">
       <div className="navbar-container xd">
            <Navbar onLogout={handleLogout}/>
        </div>
    <Sidebar />

    <div className="guest-info-container">
        {guestInfo && guestInfo.details && (
            <>
                {/* Processor Information */}
                {guestInfo.details['Processor Information'] && (
                    <div className="info-card">
                        <div className="info-title">Processor Information</div>
                        <div className="info-sub">
                            <p>Caption: {guestInfo.details['Processor Information'].Caption}</p>
                            <p>DeviceID: {guestInfo.details['Processor Information'].DeviceID}</p>
                            <p>MaxClockSpeed: {guestInfo.details['Processor Information'].MaxClockSpeed}</p>
                            <p>Name: {guestInfo.details['Processor Information'].Name}</p>
                            <p>NumberOfCores: {guestInfo.details['Processor Information'].NumberOfCores}</p>
                        </div>
                    </div>
                )}

                {/* Memory Information */}
                {guestInfo.details['Memory Information'] && (
                    <div className="info-card">
                        <div className="info-title">Memory Information</div>
                        <div className="info-sub">
                            {guestInfo.details['Memory Information'].map((memory, index) => (
                                <div key={index}>
                                    <p>Capacity: {memory.Capacity}</p>
                                    <p>DeviceLocator: {memory.DeviceLocator}</p>
                                    <p>Speed: {memory.Speed}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* System Information */}
                {guestInfo.details['System Information'] && (
                    <div className="info-card">
                        <div className="info-title">System Information</div>
                        <div className="info-sub">
                            <p>OS Name: {guestInfo.details['System Information']['OS Name:']}</p>
                        </div>
                    </div>
                )}

                {/* Network Information */}
{/* {guestInfo.details['Network Information'] && (
    <div className="info-card">
        <div className="info-title">Network Information</div>
        <div className="info-sub">
            {Object.entries(guestInfo.details['Network Information']).map(([adapterName, adapterDetails]) => (
                <div key={adapterName}>
                    <p className="adapter-title">{adapterName}</p>
                    <ul>
                        {Object.entries(adapterDetails).map(([key, value]) => (
                            <li key={key}>{`${key}: ${value}`}</li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    </div>
)} */}


                {/* Disk Information */}
{guestInfo.details['Disk Information'] && (
    <div className="info-card">
        <div className="info-title">Disk Information</div>
        <div className="info-sub">
            <p>Disk: {guestInfo.details['Disk Information'].disk}</p>
            <p>Info: {guestInfo.details['Disk Information'].info}</p>
        </div>
    </div>
)}

                {/* Note: You will need to adjust the rendering logic based on the actual structure of these objects */}
            </>
        )}
    </div>
</div>
);
}

export default GuestDashboard;
