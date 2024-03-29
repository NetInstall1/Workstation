import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../config';
import '../styles/Table.css';
import { useNavigate } from 'react-router';


const Table = ({ hostData, agentList }) => {
    const navigate = useNavigate();
    const [filter, setFilter] = useState(''); 
    const [tableData, setTableData] = useState([]);
    const [selectedAgent, setSelectedAgent] = useState()
    console.log("host Data")
    console.log(agentList)
    useEffect(() => {
        // Fetch guest information when the component mounts
        const fetchHostInfo = async () => {
            try {
                const res = await fetch(`${BASE_URL}/guestInfo`);
                const data = await res.json();
                setTableData(data);
            } catch (err) {
                console.log(err);
            }
        };

        fetchHostInfo();
    }, []);

    // Function to handle row click
    const handleRowClick = (ip_address) => {
        navigate(`/guest/${ip_address}`);
    };

    // Filter the table data based on the filter text
    const filteredData = tableData.filter((item) =>
        Object.values(item).some((value) =>
            value.toString().toLowerCase().includes(filter.toLowerCase())
        )
    );

    const handleSelectedAgent = (agent)=>{
        setSelectedAgent(agent)
    }
    const handleFilterOption = (option) => {
        console.log("Selected option:", option);
    };
    
    return (
        <div className="container">
            <div className="row dboard">
                <div className="col-md-11">
                    <h2 className="tablex">Workstations & Servers</h2>
                    <h4 className=" dbno" style={{ color: 'grey', display: 'inline-block' }}>Total <b>{filteredData.length}</b></h4>
                    <div className="table-filter mt-4">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search..."
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                        />
                    </div>

                    {
                        agentList.map((item, index) => {

                            return (<div className="row">
                                <div className="col">
                                    <button className="btn btn-primary"
                                    onClick={() => handleSelectedAgent(item)}
                                    >
                                        {item.agent_name}
                                    </button>
                                </div>
                            </div>)
                        })
                    }

                    <div className="table-container">
                        <table className="table mx-auto my-3 headingrow">
                            <thead>
                                <tr>
                                    <th className="visible-column gray-bg columnsx">Hostname</th>
                                    <th className="columnsx">IP address</th>
                                    <th className="columnsx">MAC address</th>
                                    <th className="columnsx">Status</th>
                                    <th className="columnsx">OS</th>
                                    <th className="columnsx">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {selectedAgent && selectedAgent['guests'].map((item, index) => (
                                    <tr key={index} onClick={() => handleRowClick(item._id)}>
                                        <td className="visible-column">{item.hostname}</td>
                                        <td>{item.ip_address}</td>
                                        <td>{item.mac_address}</td>
                                        <td>{item.status}</td>
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
