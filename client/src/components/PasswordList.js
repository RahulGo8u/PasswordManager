import React, { useState, useEffect } from 'react';
import AddPassword from './AddPassword';
import { Container } from 'react-bootstrap';
import axios from 'axios'; // Import Axios

function PasswordList() {
  const [passwords, setPasswords] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddPassword, setShowAddPassword] = useState(false);

  useEffect(() => {
    // Fetch user passwords from your API
    const fetchPasswords = async () => {
      try {
        const response = await axios.get('http://localhost:3002/api/userpassword/getall/U59g0y5or8');
        console.log(response);
        setPasswords(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPasswords();
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleAddNewPassword = () => {
    setShowAddPassword(true);
  };

  const handleClearSearch = () => {
    setSearchTerm('');
  };

  const handleAddPasswordSubmit = (newPassword) => {
    // Perform the API call to add the new password to the server here

    // Update the state and hide the AddPassword component
    setPasswords([...passwords, newPassword]);
    setShowAddPassword(false);
  };

  const filteredPasswords = passwords.filter((password) =>
    password.url.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container className="mt-5" style={{ maxWidth: '600px' }}>
      {!showAddPassword && <h1 className="text-center">Password List</h1>}
      {showAddPassword ? (
        <AddPassword onAddPassword={handleAddPasswordSubmit} />
      ) : (
        <>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by Url"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          <div className="d-flex mb-3 justify-content-center">
            <button className="btn btn-primary me-3" onClick={handleAddNewPassword}>
              Add New Password
            </button>
            <button className="btn btn-secondary" onClick={handleClearSearch}>
              Clear
            </button>
          </div>
          <div className="table-responsive">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Email</th>
                  <th>Password</th>
                  <th>Url</th>
                </tr>
              </thead>
              <tbody>
                {filteredPasswords.map((password) => (
                  <tr key={password.id}>
                    <td>{password.email}</td>
                    <td>{password.password}</td>
                    <td>{password.url}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </Container>
  );
}

export default PasswordList;
