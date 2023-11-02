import React, { useState } from "react";
import { BASE_URL } from "../config";
import { Form, Button, Container, InputGroup } from 'react-bootstrap';
import {AiFillEyeInvisible, AiFillEye} from 'react-icons/ai'

const CreateAgent = () => {
    const [guest_user, setGuest_user] = useState('')
    const [guest_pass, setGuest_pass] = useState('')
    const [ip_range, setIp_range] = useState('')
    const [showPass, setShowPass] = useState(false)

    const handleGuest_userChange = (e) => {
        setGuest_user(e.target.value)
    }

    const handleGuest_passChange = (e) => {
        setGuest_pass(e.target.value)
    }

    const handleIp_rangeChange = (e) => {
        setIp_range(e.target.value)
    }

    const handleSubmit = () => {
        fetch(`${BASE_URL}/create-agent`,
            {
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ guest_user, guest_pass, ip_range })
            })
    }
    return (
        <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
            <Form onSubmit={handleSubmit}>
            <h3 className="mb-5">Create Agent</h3>
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
                    <Button onClick={()=>{setShowPass(!showPass)}}>
                        {showPass?<AiFillEye/>:<AiFillEyeInvisible/>}
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
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </Container>
    )
}

export default CreateAgent