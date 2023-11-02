import React, { useEffect } from "react";
import { useState } from "react";
import { Form, Button, Modal, Container } from 'react-bootstrap'



const UploadModal = (props) => {

    const [selectedFile, setSelectedFile] = useState(null);
    const [softwareName, setsoftwareName] = useState("")
    const [silentInstallationCommand, setSilentInstallationCommand] = useState("")

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        const fileReader = new FileReader()
        fileReader.readAsDataURL(file)
        fileReader.onloadend=()=>{
            console.log(`file reader result${fileReader.result}`)
            setSelectedFile(fileReader.result)
        }
    };

    const handleSoftwareNameChange = (event) => {
        setsoftwareName(event.target.value)
    }

    const handleSilentCommandChange = (event) => {
        setSilentInstallationCommand(event.target.value)
    }

    const handleUpload = () => {
        // Add code here to handle the file upload or silent installation
        console.log("Selected file:", selectedFile);
        // Replace the following command with your actual command for silent installation
        // const silentInstallationCommand = "your-silent-installation-command";
        console.log("Silent Installation Command:", silentInstallationCommand);

        
    };
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
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
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}
export default UploadModal
