import React, { useState } from 'react';
import './Table.css';

const Table = () => {
  const [filter, setFilter] = useState(''); // State to store the filter text

  // Dummy data for the table
  const tableData = [
    { name: 'Data 1', friendlyName: 'Friendly 1', logIn: 'Login 1', deviceType: 'Device 1', siteName: 'Site 1', lastUser: 'User 1', os: 'Linux' },
    { name: 'Data 1', friendlyName: 'Friendly 1', logIn: 'Login 1', deviceType: 'Device 1', siteName: 'Site 1', lastUser: 'User 1', os: 'OS 1' },
    { name: 'Data 1', friendlyName: 'Friendly 1', logIn: 'Login 1', deviceType: 'Device 1', siteName: 'Site 1', lastUser: 'User 1', os: 'OS 1' },
    { name: 'Data 1', friendlyName: 'Friendly 1', logIn: 'Login 1', deviceType: 'Device 1', siteName: 'Site 1', lastUser: 'User 1', os: 'OS 1' },
    { name: 'Data 1', friendlyName: 'Friendly 1', logIn: 'Login 1', deviceType: 'Device 1', siteName: 'Site 1', lastUser: 'User 1', os: 'OS 1' },
     { name: 'Data 1', friendlyName: 'Friendly 1', logIn: 'Login 1', deviceType: 'Device 1', siteName: 'Site 1', lastUser: 'User 1', os: 'OS 1' },
     { name: 'Data 1', friendlyName: 'Friendly 1', logIn: 'Login 1', deviceType: 'Device 1', siteName: 'Site 1', lastUser: 'User 1', os: 'OS 1' },
     { name: 'Data 1', friendlyName: 'Friendly 1', logIn: 'Login 1', deviceType: 'Device 1', siteName: 'Site 1', lastUser: 'User 1', os: 'OS 1' },
     { name: 'Data 1', friendlyName: 'Friendly 1', logIn: 'Login 1', deviceType: 'Device 1', siteName: 'Site 1', lastUser: 'User 1', os: 'OS 1' },
     { name: 'Data 1', friendlyName: 'Friendly 1', logIn: 'Login 1', deviceType: 'Device 1', siteName: 'Site 1', lastUser: 'User 1', os: 'OS 1' },
     { name: 'Data 1', friendlyName: 'Friendly 1', logIn: 'Login 1', deviceType: 'Device 1', siteName: 'Site 1', lastUser: 'User 1', os: 'OS 1' },
     { name: 'Data 1', friendlyName: 'Friendly 1', logIn: 'Login 1', deviceType: 'Device 1', siteName: 'Site 1', lastUser: 'User 1', os: 'OS 1' },
    // Add more data as needed
  ];

  // Function to handle filter input change
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  // Filter the table data based on the filter text
  const filteredData = tableData.filter((item) =>
    Object.values(item).some((value) =>
      value.toString().toLowerCase().includes(filter.toLowerCase())
    )
  );

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-1">
          {/* Add your sidebar here */}
          <div className="sidebar">
            {/* Sidebar content */}
          </div>
        </div>
        <div className="col-md-11">
          <h2 className="mt-4">Workstations & Servers</h2>
          <div className="table-filter mt-4">
            <input
              type="text"
              className="form-control"
              placeholder="Search..."
              value={filter}
              onChange={handleFilterChange}
            />
          </div>
          <div className="table-container">
            <table className="table mx-auto my-3">
              <thead>
                <tr>
                <th style={{ backgroundColor: '#f2f2f2' }} className="visible-column gray-bg">Name</th>
               <th style={{ backgroundColor: '#f2f2f2' }}>Friendly Name</th>
               <th style={{ backgroundColor: '#f2f2f2' }}>Log In</th>
              <th>Device Type</th>
             <th>Site Name</th>
                <th>Last User</th>
              <th>OS</th>

                </tr>
              </thead>
              <tbody>
                {filteredData.map((item, index) => (
                  <tr key={index}>
                    <td className="visible-column">{item.name}</td>
                    <td>{item.friendlyName}</td>
                    <td>{item.logIn}</td>
                    <td>{item.deviceType}</td>
                    <td>{item.siteName}</td>
                    <td>{item.lastUser}</td>
                    <td>{item.os}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
