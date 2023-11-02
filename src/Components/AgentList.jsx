import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';


function AgentList() {
    return (
      <Container>
        <Row>
          <Col>
            <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
              {/* Buttons and content go here */}
              <Button>Agent 1</Button>
              <Button>Agent 2</Button>
              <Button>Aeent 3</Button>
              {/* Add more buttons and content as needed */}
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
  
  export default AgentList;
  