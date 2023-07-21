import React, { useState } from 'react';

function AddPassword({ onAddPassword }) {
  const [title, setTitle] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [domain, setDomain] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPassword = {
      title,
      username,
      password,
      domain,
    };
    onAddPassword(newPassword);
    setTitle('');
    setUsername('');
    setPassword('');
    setDomain('');
  };

  return (
    <div>
      <h1>Add New Password</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="domain">Domain:</label>
          <input
            type="text"
            id="domain"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
          />
        </div>
        <button type="submit">Add Password</button>
      </form>
    </div>
  );
}

export default AddPassword;
