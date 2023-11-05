import React, { useState, useEffect } from 'react';
import SystemInfoCard from '../Components/SystemInfoCard';
import Navbar from '../Components/Navbar'; 
import '../styles/Navbar.css';
import GuestSidebar from '../Components/GuestSidebar'
import {
  faDesktop,
  faNetworkWired,
  faMicrochip,
  faHdd,
  faTv,
  faMemory,
  faLaptop,
  faServer,
} from '@fortawesome/free-solid-svg-icons';

const SystemInfo = () => {
  const [systemData, setSystemData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      // Simulating API call with a timeout
      try {
        const data = [
          { title: "Operating System", value: "Windows 10", icon: faDesktop },
          { title: "Network", value: "Ethernet", icon: faNetworkWired },
          { title: "Motherboard", value: "ASUS Prime", icon: faMicrochip },
          { title: "CPU", value: "Intel Core i7", icon: faServer },
          { title: "GPU", value: "Nvidia GeForce RTX 3080", icon: faTv },
          { title: "RAM", value: "16GB", icon: faMemory },
          { title: "Drives", value: "1TB HDD, 500GB SSD", icon: faHdd },
          { title: "Display", value: '27" LCD', icon: faLaptop },
          { title: "BIOS Version", value: "v2.5.1", icon: faServer },
          { title: "Ethernet MAC", value: "00:1A:A0:12:05:23", icon: faNetworkWired },
          { title: "Total Memory Slots", value: "4", icon: faMemory },
    
        ];
        setSystemData(data);
      } catch (error) {
        console.error('Error fetching system data:', error);
      }
    };

    fetchData();
  }, []);
  return (
    <div>
      <Navbar />
      <div className="container">
        <GuestSidebar className="guest-sidebar" />
        <div className="dashboard">
          {systemData.map((data, index) => (
            <div className="grid-item" key={index}>
              <SystemInfoCard title={data.title} value={data.value} icon={data.icon} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SystemInfo;