import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios'; // Import Axios
import CryptoJS from 'crypto-js';



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
      const encryptedPwd = encryptText(password);
      const response = await axios.post('http://localhost:3002/api/userpassword/add', {
        userid: 'U59g0y5or8',
        email: username,
        password:encryptedPwd,
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

    const encryptText = (message) => {
      const ciphertext = CryptoJS.AES.encrypt(message, '8e7c0b920573e67691331358d7b11364').toString();
      return ciphertext;
    };    
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
