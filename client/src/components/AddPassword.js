import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios'; // Import Axios

function AddPassword({ onAddPassword }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [url, setUrl] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPassword = {
      username,
      password,
      url,
    };

    try {
      // Send a POST request to add the new password using Axios
      const response = await axios.post('http://localhost:3002/api/userpassword/add', {
        userid: 'U59g0y5or8',
        email: username,
        password,
        url,
      });

      console.log(response.data); // Response message from the server
      onAddPassword(newPassword);
      setUsername('');
      setPassword('');
      setUrl('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="w-50">
        <h2>Add New Password</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="username">
            <Form.Label>Username:</Form.Label>
            <Form.Control
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{ maxWidth: '100%' }}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password:</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ maxWidth: '100%' }}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="url">
            <Form.Label>URL:</Form.Label>
            <Form.Control
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              style={{ maxWidth: '100%' }}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Add Password
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default AddPassword;
