import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Alert, Modal } from 'react-bootstrap';
import CopyToClipboard from 'react-copy-to-clipboard';

const AgentIdSection = ({ Agent_id, onCopy, copied }) => {
    return (
        <div>
            <h4>Agent ID Section</h4>
            <p>{Agent_id}</p>
            <CopyToClipboard text={Agent_id} onCopy={onCopy}>
                <Button variant="success">{copied ? 'Copied!' : 'Copy Agent ID'}</Button>
            </CopyToClipboard>
            {copied && (
                <Alert variant="success" className="mt-2">
                    Agent ID copied to clipboard!
                </Alert>
            )}
        </div>
    );

}


const DownloadAgent = ({ Agent_id, show, handleClose }) => {
    const [copied, setCopied] = useState(false);
    const navigate = useNavigate()

    const handleCopy = () => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    };

    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header>
                    <Modal.Title>Agent Config</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <AgentIdSection Agent_id={Agent_id} onCopy={handleCopy} copied={copied} />
                <Button variant='primary' className='mt-3'>Download Agent</Button>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => { navigate('/dashboard') }}>Dashboard</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default DownloadAgent;