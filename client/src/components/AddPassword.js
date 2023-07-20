import React, { useState } from 'react';

function AddPassword({ onAddPassword }) {
  const [title, setTitle] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPassword = {
      title,
      username,
      password,
    };
    try {
      const response = await fetch('http://localhost:5000/passwords', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPassword),
      });
      const createdPassword = await response.json();
      onAddPassword(createdPassword);
      setTitle('');
      setUsername('');
      setPassword('');
    } catch (error) {
      console.error('Error adding password:', error);
    }
  };

  return (
    <div>
      <h1>Add New Password</h1>
      <form onSubmit={handleSubmit}>
        {/* ... Input fields and submit button ... */}
      </form>
    </div>
  );
}

export default AddPassword;
