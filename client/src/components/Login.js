import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [jwtToken, setJwtToken] = useState(null);
  const navigate = useNavigate(); // Get the navigate function from react-router-dom

  const handleSignInWithEmail = async () => {
    try {
      await auth.signInWithEmailAndPassword(email, password);
      setError(null);
      navigate('/userdetail'); // Redirect to UserDetail component after successful login
    } catch (err) {
      setError(err.message);
      console.error(err);
    }
  };

  const handleSignInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const response = await signInWithPopup(auth, provider);
      setError(null);

      // Get the JWT token from the user object
      const jwtToken = await response.user.getIdToken();
      console.log('jwt');
      console.log(jwtToken);
      // Parse the token to get its details
      const decodedToken = parseJwt(jwtToken);
      console.log('decodedToken');
      console.log(decodedToken);
      setJwtToken(decodedToken);
      navigate('/userdetail'); // Redirect to UserDetail component after successful login with Google
    } catch (err) {
      setError(err.message);
      console.error(err);
    }
  };

  // Function to parse the JWT token
  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      return null;
    }
  };

  return (
    <div className="container mt-5">
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div className="mb-3">
        <label className="form-label">Email</label>
        <input
          type="email"
          className="form-control"
          placeholder="Email.."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Password</label>
        <input
          type="password"
          className="form-control"
          placeholder="Password.."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button className="btn btn-primary me-3" onClick={handleSignInWithEmail}>Sign in with Email</button>
      <button className="btn btn-danger" onClick={handleSignInWithGoogle}>Sign in with Google</button>
      <div className="mt-3">
        <Link to="/register" className="btn btn-link">Register</Link>
      </div>
    </div>
  );
};

export { Login };
