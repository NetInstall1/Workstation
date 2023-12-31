import React, { useEffect, useState } from 'react';
import {BASE_URL} from '../config'
import '../styles/Table.css'
import { useNavigate } from 'react-router';

const Table = ({hostData}) => {

  const navigate = useNavigate()
  const [filter, setFilter] = useState(''); // State to store the filter text
  const [tableData, setTableData] = useState([])
  // Dummy data for the table
  console.log("Tabel")
  console.log(hostData)
  
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

  // const fetchHostInfo = ()=>{
  //   fetch(`${BASE_URL}/api/hostInfo`)
  //   .then((res)=>{
  //     res = res.json()
  //     console.log(res)
  //     // setTableData(res)
  //   })
  //   .catch((err)=>{
  //     console.log(err)
  //   })
  // }
  const fetchHostInfo = async()=>{

    try{
      var res = await fetch(`${BASE_URL}/guestInfo`)
      res = await res.json()
      console.log(res)
      setTableData(res)
    }
    catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    fetchHostInfo()
  },[])
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
        <h2 className="mt-4 custom-h1">Workstations & Servers</h2>
        <h4 style={{ color: 'grey', display: 'inline-block', marginLeft: '60px' }}>Total  <b>10</b></h4>
         <button className="btn btn-outline-primary btn-filtered" onClick={() => alert('Filtered')}>Filtered</button>
        <button className="btn btn-outline-primary btn-filtered" onClick={() => alert('Selected')}>
                       Selected
               </button>

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
      <th style={{ backgroundColor: '#f2f2f2' }} className="visible-column gray-bg">
       <div class="header-with-icon">
       <i class="fa fa-home icon"></i> Hostname
       </div>
    </th>
    <th style={{ backgroundColor: '#f2f2f2' }}>
  <div class="header-with-icon">
    <i class=" fa fa-network-wired icon"></i> IP address
  </div>
    </th>
    <th style={{ backgroundColor: '#f2f2f2' }}>
      <div class="header-with-icon">
    <i class="fa fa-id-card icon"></i> MAC address
  </div>
   </th> 
    <th>
  <div class="header-with-icon">
    <i class="fa fa-check-circle icon"></i> Status
          </div>  
        </th>
       <th>
  <div class="header-with-icon">
    <i class="fa fa-laptop icon"></i> OS
            </div>
        </th>
       <th>
           <div class="header-with-icon">
        <i class="fa fa-cogs icon"></i> Action
      </div>
     </th>

                </tr>
              </thead>
              <tbody onClick={()=>{navigate('/guestDashboard')}}>
                {filteredData.map((item, index) => (
                  <tr key={index}>
                    <td className="visible-column">{item.hostname}</td>
                    <td>{item.ip_address}</td>
                    <td>{item.mac_address}</td>
                    <td>{item.status}</td>
                    {/* <td>{item.device_type}</td> */}
                    <td>{item.os}</td>
                    <td>{item.action}</td>
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
