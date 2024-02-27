import React, { useState, useEffect } from 'react';
import { Modal, Table, Button, Form, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { BASE_URL } from '../config';

const DeployModal = ({ show, onHide, fileId }) => {
    const [guests, setGuests] = useState([]);
    const [selectedGuests, setSelectedGuests] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [selectedFile, setSelectedFile] = useState('');

    useEffect(() => {
        if (show) { // Only make API calls when the modal is open
            setIsLoading(true);
            // Fetch guests
            axios.get(`${BASE_URL}/api/guestInfo`)
                .then(response => {
                    const successfulLogins = response.data.filter(guest => guest.action === 'Login Success');
                    setGuests(successfulLogins);
                    setIsLoading(false);
                })
                .catch(error => {
                    console.error('Error fetching guests:', error);
                    setIsLoading(false);
                });

            // Fetch uploaded files
            axios.get(`${BASE_URL}/api/uploaded-files`, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            }) // Adjust the endpoint as needed
                .then(response => {
                    setUploadedFiles(response.data);
                })
                .catch(error => {
                    console.error('Error fetching uploaded files:', error);
                });
        }
    }, [show]);

    const handleCheckboxChange = (guestIp) => {
        setSelectedGuests(prevSelectedGuests => {
            if (prevSelectedGuests.includes(guestIp)) {
                return prevSelectedGuests.filter(ip => ip !== guestIp);
            } else {
                return [...prevSelectedGuests, guestIp];
            }
        });
    };

    const handleDeploy = () => {
        axios.post(`${BASE_URL}/api/deploy`, {
            fileIdentifier: selectedFile,
            ipAddresses: selectedGuests
        })
        .then(response => {
            alert('Deployment initiated successfully.');
            onHide(); // Close the modal
        })
        .catch(error => {
            alert('Error in deployment.');
            console.error('Deployment error:', error);
        });
    };

    return (
        <Modal show={show} onHide={onHide} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">Available Systems</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {isLoading ? (
                    <div className="text-center">
                        <Spinner animation="border" />
                    </div>
                ) : (
                    <>
                    {/* Dropdown to select file */}
                    <Form.Group className="mb-3">
                        <Form.Label>Select File to Deploy:</Form.Label>
                        <Form.Control as="select" value={selectedFile} onChange={(e) => setSelectedFile(e.target.value)}>
                            <option value="">Select a File</option>
                            {uploadedFiles.map(file => (
                                <option key={file} value={file}>{file}</option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Host Name</th>
                                <th>IP Address</th>
                                <th>Select</th>
                            </tr>
                        </thead>
                        <tbody>
                            {guests.map(guest => (
                                <tr key={guest.ip_address}>
                                    <td>{guest.hostname}</td>
                                    <td>{guest.ip_address}</td>
                                    <td>
                                        <Form.Check
                                            type="checkbox"
                                            onChange={() => handleCheckboxChange(guest.ip_address)}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    </>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleDeploy}>Deploy</Button>
                <Button variant="secondary" onClick={onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default DeployModal;
