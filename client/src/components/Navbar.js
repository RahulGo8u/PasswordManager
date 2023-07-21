import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase'; // Import the firebase auth instance
import { Button } from 'react-bootstrap'; // Import the Bootstrap Button component

function Navbar() {
  const navigate = useNavigate();

  // Function to handle the logout
  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate('/login'); // Redirect to login page after logout
    } catch (error) {
      console.error(error);
    }
  };

  // Check if the user is logged in
  const isUserLoggedIn = !!auth.currentUser;
  const userEmail = auth.currentUser?.email;

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link to="/" className="navbar-brand">Password Manager</Link>
        <ul className="navbar-nav">
          {/* Show "Login" link only if the user is not logged in */}
          {!isUserLoggedIn && (
            <li className="nav-item">
              <Link to="/" className="nav-link">Login</Link>
            </li>
          )}
          {/* Show other links after login */}
          {isUserLoggedIn && (
            <>
              <li className="nav-item">
                <Link to="/passwords" className="nav-link">Password List</Link>
              </li>
              <li className="nav-item">
                <Link to="/add" className="nav-link">Add Password</Link>
              </li>
              <li className="nav-item">
                {/* Show user's email in the navbar */}
                <span className="nav-link">Welcome, {userEmail}</span>
              </li>
              <li className="nav-item">
                <Button variant="outline-danger" onClick={handleLogout}>
                  Logout
                </Button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
