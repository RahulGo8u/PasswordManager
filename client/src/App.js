import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import PasswordList from './components/PasswordList';
import AddPassword from './components/AddPassword';
import './App.css';

function App() {
  const [passwords, setPasswords] = useState([]);

  const handleAddPassword = (newPassword) => {
    setPasswords([...passwords, newPassword]);
  };

  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/passwords"
            element={<PasswordList passwords={passwords} />}
          />
          <Route
            path="/add"
            element={<AddPassword onAddPassword={handleAddPassword} />} // Pass the handleAddPassword function as a prop
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
