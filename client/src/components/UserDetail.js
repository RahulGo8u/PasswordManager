import React from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { Button, Container, Row, Col } from 'react-bootstrap'; // Import Bootstrap components

const UserDetail = ({ passwords, jwtToken }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate('/login'); // Redirect to login page after logout
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <Row>
        <Col xs={12}>
          <div className="mt-4">
            {/* Display user's name and email */}
            <h3>Welcome, {auth.currentUser.displayName}</h3>
            <p>Email: {auth.currentUser.email}</p>
            {/* Display user's profile photo if available */}
            {auth.currentUser.photoURL && (
              <img
                src={auth.currentUser.photoURL}
                alt="Profile"
                className="img-thumbnail"
                style={{ width: '200px' }}
              />
            )}
          </div>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <div className="mt-4">
            <Button variant="primary" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </Col>
      </Row>      
    </Container>
  );
};

export default UserDetail;
