import React from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import './HomePage.css'; // Import your custom CSS file for styling

function Home() {
    const navigate = useNavigate()

    const handleLoginClick = () =>{
        navigate('/login')
    }

    const handleRegisterClick = () =>{
        navigate('/registration')
    }

  return (
    <Container className="home-container d-flex align-items-center justify-content-center">
      <Row>
        <Col xs={12} className="text-center">
          <Button onClick={handleLoginClick} variant="primary" className="custom-button" >
            Login
          </Button>
        </Col>
        <Col xs={12} className="text-center">
          <Button onClick={handleRegisterClick} variant="success" className="custom-button" >
            Register
          </Button>
        </Col>
      </Row>
    </Container>
  );;
}

export default Home;
