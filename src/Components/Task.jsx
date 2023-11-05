import React, { useState, useEffect } from 'react';
import '../styles/TaskManager.css';
import processAIcon from '../images/logo.png';
import processBIcon from '../images/logo.png';
import processCIcon from '../images/fire.jpeg';
import processDIcon from '../images/mac.png';
import processEIcon from '../images/mac.png';
import processFIcon from '../images/logo.png';


const TaskManager = () => {
  const [processes, setProcesses] = useState([]);
  const [cpuUsage, setCpuUsage] = useState(0);
  const [ramUsage, setRamUsage] = useState(0);

  // Simulate process data
  useEffect(() => {
    // Simulate a list of processes (sample data)
    const sampleProcesses = [
      { id: 1, name: 'Process A', cpu: '10%', memory: '200 MB', icon: processAIcon },
      { id: 2, name: 'Process B', cpu: '5%', memory: '150 MB' , icon: processBIcon },
      { id: 3, name: 'Process C', cpu: '15%', memory: '300 MB', icon: processCIcon },
      { id: 4, name: 'Process D', cpu: '7%', memory: '250 MB', icon: processDIcon },
      { id: 5, name: 'Process E', cpu: '22%', memory: '140 MB' , icon: processEIcon },
      { id: 6, name: 'Process F', cpu: '32%', memory: '330 MB' , icon: processFIcon},
    ];
    setProcesses(sampleProcesses);
  }, []);


  // Simulate CPU and RAM performance 
  useEffect(() => {
    // Simulate CPU and RAM usage  based on trends (sample data)
    const updatePerformancePrediction = () => {
      const newCpuUsage = Math.min(cpuUsage + Math.random() * 10, 100);
      const newRamUsage = Math.min(ramUsage + Math.random() * 15, 100);
      setCpuUsage(newCpuUsage);
      setRamUsage(newRamUsage);
    };

    const interval = setInterval(updatePerformancePrediction, 2000); // Update every 3 seconds

    return () => clearInterval(interval);
  }, [cpuUsage, ramUsage]);


  return (
    <div className="task-manager">
      <h2>Task Manager</h2>
      <div className="performance-predictor">
        <div className="performance-prediction">
          <h3>CPU Usage</h3>
          <div className="progress-bar">
            <div className="usage" style={{ width: `${cpuUsage}%` }}>
              {cpuUsage.toFixed(2)}%
            </div>
          </div>
        </div>
        <div className="performance-prediction">
          <h3>RAM Usage</h3>
          <div className="progress-bar">
            <div className="usage" style={{ width: `${ramUsage}%` }}>
              {ramUsage.toFixed(2)}%
            </div>
          </div>
        </div>
      </div>
      <table className="process-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>ID</th>
            <th>CPU</th>
            <th>Memory</th>
          </tr>
        </thead>
        <tbody>
        {processes.map((process) => (
  <tr key={process.id}>
    <td className="process-cell">
      <img src={process.icon} alt={process.name} className="process-icon" />
      <span className="process-name">{process.name}</span>
    </td>
    <td>{process.id}</td>
    <td>{process.cpu}</td>
    <td>{process.memory}</td>
  </tr>
))}


        </tbody>
      </table>
    </div>
  );
};

export default TaskManager;
