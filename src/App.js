import React from 'react';
import './App.css'; // Import your CSS file if needed
import Table from './Components/Table'; // Import the Table component
import Navbar from './Components/Navbar'; 
// src/index.js or src/App.js
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from './Components/Sidebar'; 
import { useState } from 'react';

function App() {
  const [hostData, setHostData] = useState([])

  const handleDataFetched = (data) => {
    console.log("handleDataFetched")
    console.log(data)
    setHostData(data);
  };
  return (
    <div className="App">
      <Navbar />
      <Sidebar onDataFetched={handleDataFetched} hostData={hostData}/>
      <Table data={hostData}/> {/* Render the Table component */}
    </div>
  );
}

export default App;

