import React, { useState, useEffect } from 'react';

function PasswordList() {
  const [passwords, setPasswords] = useState([]);

  useEffect(() => {
    fetchPasswords();
  }, []);

  const fetchPasswords = async () => {
    try {
      const response = await fetch('http://localhost:5000/passwords');
      const data = await response.json();
      setPasswords(data);
    } catch (error) {
      console.error('Error fetching passwords:', error);
    }
  };

  return (
    <div>
      <h1>Password List</h1>
      <ul>
        {passwords.map((password) => (
          <li key={password.id}>
            <strong>{password.title}</strong>
            <p>Username: {password.username}</p>
            <p>Password: {password.password}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PasswordList;
