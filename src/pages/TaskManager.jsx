import React from 'react';
import Navbar from '../Components/Navbar'; // Import the Navbar component
import Sidebar from '../Components/Sidebar';// Import the Sidebar component 
import Task from '../Components/Task'
const TaskManagerPage = () => {
  return (
    <div className="task-manager-page">
      <Navbar />
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <Sidebar />
          </div>
          <div className="col-md-12">
            {/* Include the TaskManager component */}
            <Task />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskManagerPage;
