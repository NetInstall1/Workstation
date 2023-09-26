
// src/app.js

import React from 'react';
import './App.css'; // Import your CSS file if needed
import Table from './Components/Table'; // Import the Table component
import Navbar from './Components/Navbar'; 
// src/index.js or src/App.js
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from './Components/Sidebar'; 

function App() {
  return (
    <div className="App">
      <Navbar />
      <Sidebar />
      <Table /> {/* Render the Table component */}
    </div>
  );
}

export default App;

