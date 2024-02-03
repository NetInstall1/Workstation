import React, { useState } from "react";
import { BASE_URL } from "../../config";
import { Form, Button, Container, InputGroup } from 'react-bootstrap';
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai'
import DownloadAgent from "../../Components/DownloadAgent";
import Sidebar from "../../Components/Sidebar";
import { ToastContainer, toast } from 'react-toastify';


const CreateAgent = () => {
    const [guest_user, setGuest_user] = useState('')
    const [guest_pass, setGuest_pass] = useState('')
    const [ip_range, setIp_range] = useState('')
    const [showPass, setShowPass] = useState(false)
    const [Agent_id, setAgent_id] = useState('')
    const [agent_name, setAgent_name] = useState('')
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [showDownload, setShowDownload] = useState(false);
    const handleCloseDownload = () => showDownload(false);
    const handleShowDownlaod = () => showDownload(true);


    const handleGuest_userChange = (e) => {
        setGuest_user(e.target.value)
    }

    const handleGuest_passChange = (e) => {
        setGuest_pass(e.target.value)
    }

    const handleIp_rangeChange = (e) => {
        setIp_range(e.target.value)
    }

    const handleAgent_nameChange = (e) => {
        setAgent_name(e.target.value)
    }

    const handleSubmit = async (e) => {
        const token = localStorage.getItem('token')
        const user_id = localStorage.getItem('user_id')
        console.log(token)
        e.preventDefault()
        try {
            var res = await fetch(`${BASE_URL}/api/agent/create`,
                {
                    method: "post",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify({ guest_user, guest_pass, ip_range, agent_name, user_id })
                })

            if (!res.ok) {
                const errorResponse = await res.json();
                throw new Error(errorResponse.error);
            }
            res = await res.json()
            console.log(res)
            // console.log(res.agent._id)
            setAgent_id(res.agent_id)
            setShowDownload(!showDownload)
            setFormSubmitted(!formSubmitted)
            toast.success(res.message, {
                position: toast.POSITION.TOP_RIGHT,
            });
        } catch (err) {
            console.log(err)

            toast.error(`${err}`, {
                position: toast.POSITION.TOP_RIGHT,
            });
            console.log(`Error occurred while creating Agent: ${err}`)
        }

    }
    return (
        <>
        <ToastContainer />
            <Sidebar />
            <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
                <Form className="shadow p-4 rounded" onSubmit={handleSubmit}>
                    <h3 className="mb-5">Create Agent</h3>
                    <Form.Group className="mb-3">
                        <Form.Control
                            type="text"
                            value={agent_name}
                            onChange={handleAgent_nameChange}
                            placeholder="Enter Agent Name">

                        </Form.Control>

                    </Form.Group>
                    <Form.Group className="mb-3">
                        {/* <Form.Label>Guest User</Form.Label> */}
                        <Form.Control
                            type="text"
                            value={guest_user}
                            onChange={handleGuest_userChange}
                            placeholder="Enter Guest User Login"
                        />
                    </Form.Group>

                    <InputGroup className="mb-3">
                        {/* <Form.Label>Guest Password</Form.Label> */}
                        <Form.Control
                            type={showPass ? "password" : "text"}
                            value={guest_pass}
                            onChange={handleGuest_passChange}
                            placeholder="Enter Guest Password"
                        />
                        <Button onClick={() => { setShowPass(!showPass) }}>
                            {showPass ? <AiFillEye /> : <AiFillEyeInvisible />}
                        </Button>
                    </InputGroup>

                    <Form.Group className="mb-3">
                        {/* <Form.Label>IP Range</Form.Label> */}
                        <Form.Control
                            type="text"
                            value={ip_range}
                            onChange={handleIp_rangeChange}
                            placeholder="Enter IP range"
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit" onClick={handleSubmit}>
                        Submit
                    </Button>
                    
                    {console.log(`${formSubmitted} and ${Agent_id}`)}
                    {formSubmitted && Agent_id && (
                        <DownloadAgent Agent_id={Agent_id} handleClose={handleCloseDownload} show={showDownload} />
                    )}
                </Form>
            </Container>
        </>
    )
}

export default CreateAgent