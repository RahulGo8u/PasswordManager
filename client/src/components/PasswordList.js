import React, { useState, useEffect } from 'react';
import AddPassword from './AddPassword';
import { Container } from 'react-bootstrap';
import axios from 'axios'; // Import Axios
import CryptoJS from 'crypto-js';
import { auth } from '../firebase';

function PasswordList() {
  const [passwords, setPasswords] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddPassword, setShowAddPassword] = useState(false);
  const userPasswordAPI = process.env.REACT_APP_USER_PASSWORD_API;
  const secretKey = process.env.REACT_APP_SECRET_KEY;

  useEffect(() => {
    // Fetch user passwords from your API
    const fetchPasswords = async () => {
      try {        
        const response = await axios.get(userPasswordAPI+'getall/'+auth.currentUser?.email);
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
    // Update the state and hide the AddPassword component
    setPasswords([...passwords, newPassword]);
    setShowAddPassword(false);
  };

  const filteredPasswords = passwords.filter((password) =>
    password.url.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const decryptText = (ciphertext) => {
    const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
    const originalMessage = bytes.toString(CryptoJS.enc.Utf8);
    return originalMessage;
  };

  const toggleShowPassword = (index) => {
    const updatedPasswords = [...passwords];
    updatedPasswords[index].showPassword = !updatedPasswords[index].showPassword;
    setPasswords(updatedPasswords);
  };

  const copyToClipboard = (text) => {
    // Create a temporary input element
    const tempInput = document.createElement('input');
    tempInput.value = text;
    document.body.appendChild(tempInput);

    // Select the text inside the input element
    tempInput.select();
    tempInput.setSelectionRange(0, 99999); // For mobile devices

    // Copy the selected text to the clipboard
    document.execCommand('copy');

    // Remove the temporary input element
    document.body.removeChild(tempInput);
  };

  // Alternate row colors
  const rowColors = ['#a2c1f5', '#a2c1f5'];

  return (
    <Container className="mt-6" style={{ maxWidth: '700px' }}>
      <br/>
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
                <tr style={{ backgroundColor: '#f0f0f0' }}>
                  {/* Background color for column headers */}
                  <th style={{ backgroundColor: '#e0e0e0' }}>Email</th>
                  <th style={{ backgroundColor: '#e0e0e0' }}>Site</th>
                  <th style={{ backgroundColor: '#e0e0e0' }}>Password</th>
                </tr>
              </thead>
              <tbody>
                {filteredPasswords.map((password, index) => (
                  <tr key={password.id} style={{ backgroundColor: rowColors[index % 2] }}>
                    {/* Alternate row colors */}
                    <td>{password.email}</td>
                    <td>{password.url}</td>
                    <td>
                      {/* Show/Hide Password Button */}
                      <div style={{ position: 'relative' }}>
                        <input
                          type={password.showPassword ? 'text' : 'password'}
                          value={decryptText(password.password)}
                          readOnly
                        />
                        <button
                          style={{ position: 'absolute', top: '50%', right: '5px', transform: 'translateY(-50%)' }}
                          onClick={() => toggleShowPassword(index)}
                        >
                          <i className={`fa ${password.showPassword ? 'fa-eye-slash' : 'fa-eye'}`} aria-hidden="true"></i>
                        </button>
                        <button
                          style={{ position: 'absolute', top: '50%', right: '35px', transform: 'translateY(-50%)' }}
                          onClick={() => copyToClipboard(decryptText(password.password))}
                        >
                          <i className="fa fa-copy" aria-hidden="true"></i>
                        </button>
                      </div>
                    </td>
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
