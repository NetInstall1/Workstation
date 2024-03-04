import React from "react";
import { useState } from "react";
import { Form, Button, Modal, Container } from 'react-bootstrap'
import axios from 'axios';
import { BASE_URL } from '../config';
import { toBeChecked } from "@testing-library/jest-dom/matchers";


const UploadModal = ({ show, onHide, onFileUploaded }) => {

    const [selectedFile, setSelectedFile] = useState(null);
    const [softwareName, setsoftwareName] = useState("")
    const [silentInstallationCommand, setSilentInstallationCommand] = useState("")
    
    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleSoftwareNameChange = (event) => {
        setsoftwareName(event.target.value)
    }

    const handleSilentCommandChange = (event) => {
        setSilentInstallationCommand(event.target.value)
    }

    const handleUpload = () => {
        if (!selectedFile || !softwareName || !silentInstallationCommand) {
            alert('Please fill in all fields and select a file.');
            console.log("Selected file:", selectedFile);
        console.log("Silent Installation Command:", silentInstallationCommand);
        
            return;
        }
        const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('softwareName', softwareName);
    formData.append('silentInstallationCommand', silentInstallationCommand);

    const token = localStorage.getItem('token')
    console.log(token)
    axios.post(`${BASE_URL}/api/upload`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            "Authorization": `Bearer ${token}`

        }
    })
    .then(response => {
        console.log(response.data);
        alert('File uploaded successfully');
        onFileUploaded(response.data.fileId);
    })
    .catch(error => {
        // Handle any errors here
        console.error('Upload failed', error);
        alert('Upload failed');
    });

        
    };
    return (
        <Modal
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={show} // This should be passed down as a prop to control visibility
            onHide={onHide} 
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Upload exe/msi
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Control className="mb-3"
                                type="file"
                                accept=".exe, .msi"
                                onChange={handleFileChange}
                            />
                            <Form.Control
                                className="mb-3"
                                type="text"
                                placeholder="Enter software name"
                                onChange={handleSoftwareNameChange}
                            />
                            <Form.Control
                                className="mb-3"
                                type="text"
                                placeholder="Silent installation command"
                                onChange={handleSilentCommandChange}
                            />
                            <Button
                                variant="primary"
                                onClick={handleUpload}>
                                Upload
                            </Button>
                        </Form.Group>
                    </Form>
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={onHide} >Close</Button>
            </Modal.Footer>
        </Modal>
    );
}
export default UploadModal
