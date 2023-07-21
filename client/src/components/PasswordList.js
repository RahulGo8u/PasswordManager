import React from 'react';

function PasswordList() {
  const passwords = [
    {
      id: 1,
      title: 'Email Password',
      username: 'user@example.com',
      password: 'securepassword1',
      domain: 'example.com',
    },
    {
      id: 2,
      title: 'Bank Account Password',
      username: 'username123',
      password: 'mybankpassword',
      domain: 'mybank.com',
    },
  ];

  return (
    <div>
      <h1>Password List</h1>
      <ul>
        {passwords.map((password) => (
          <li key={password.id}>
            <strong>{password.title}</strong>
            <p>Username: {password.username}</p>
            <p>Password: {password.password}</p>
            <p>Domain: {password.domain}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PasswordList;
