import React, { useState, useEffect } from 'react';
import Navbar from '../../Components/Navbar';
import { useParams } from 'react-router-dom';
import GuestSidebar from '../../Components/GuestSidebar';
import axios from 'axios';
import 'font-awesome/css/font-awesome.min.css';
import '../../styles/TaskManager.css'; 
import { BASE_URL } from '../../config';

const TaskManagerPage = () => {
  const [processes, setProcesses] = useState([]);
  const { guestIp } = useParams();

  const getUsageBarColorClass = (percentage) => {
    if (percentage < 25) return 'memory-usage-low'; // less than 25% usage is low
    if (percentage < 5000) return 'memory-usage-medium'; // 25% to 50% usage is medium
    return 'memory-usage-high'; // more than 50% usage is high
  };
  useEffect(() => {
    axios.get(`${BASE_URL}/process-data/${guestIp}`) 

      .then(response => {
        setProcesses(response.data.processes);
      })
      .catch(error => {
        console.error('Error fetching processes:', error);
      });
  }, [guestIp]);

  return (
    <div className="task-manager-page">
      <Navbar className="tm"/>
          <div className="col-md-3">
            <GuestSidebar />
          </div>
          <div className="col-md-12">
        <h2>Task Manager</h2>
        <div className="table-responsive">
          <table className="tablek">
            <thead>
              <tr>
                <th>Process Name</th>
                <th>PID</th>
                <th>Session Name</th>
                <th>Session No.</th>
                <th>Memory Usage</th>
              </tr>
            </thead>
            <tbody>
              {processes.map(process => {
                const usagePercentage = parseMemoryUsage(process.mem_usage);
                const barColorClass = getUsageBarColorClass(usagePercentage);
                return (
                  <tr key={process.pid}>
                    <td>{process.image_name}</td>
                    <td>{process.pid}</td>
                    <td>{process.session_name}</td>
                    <td>{process.session_num}</td>
                    <td>
                      <div className="memory-usage-bar">
                      <div
                          className={`memory-usage ${barColorClass}`}
                          style={{ width: `${usagePercentage}%` }}
                        >
                          {process.mem_usage}
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// Helper function to parse memory usage to a width percentage
function parseMemoryUsage(memUsage) {
  // Remove commas and convert to integer
  const value = parseInt(memUsage.replace(/,/g, ''), 10);

  // Assuming maxMemory is in KB and is the total RAM of the system (e.g., 8GB)
  // Convert maxMemory to KB (8GB = 8 * 1024 * 1024 KB)
  const maxMemory = 8 * 1024 * 1024; // Adjust this value based on your system's RAM
  const percentage = `${(value / maxMemory) * 100}%`;
  // Calculate percentage
  return percentage;
}


export default TaskManagerPage;
