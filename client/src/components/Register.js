import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import "../styles/Register.css"; // Import custom CSS file for styling

export const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const createNewAccount = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/login");
    } catch (err) {
      setError(err.message);
      console.error(err);
    }
  };

  return (
    <Container className="register-container mt-5 bg-light p-4 rounded" style={{ maxWidth: "400px" }}>
      <Row className="justify-content-center">
        <Col xs={12} md={8}>
          <h2 className="mb-4 text-center">Register</h2>
          {error && <Alert variant="danger" className="mb-3">{error}</Alert>}
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <br/>
            <Row className="justify-content-center">
              <Button
                variant="primary"
                onClick={createNewAccount}
                className="register-button"
              >
                Create New Account
              </Button>
            </Row>
          </Form>
          <p className="mt-3 text-center">
            Already have an account? <Link to="/login">Login here</Link>
          </p>
        </Col>
      </Row>
    </Container>
  );
};
