import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import axios from 'axios'; 
import ErrorPopup from './ErrorPopup'; 
const userApi = process.env.REACT_APP_USER_API;
const ipAddressAPI = process.env.REACT_APP_GET_IP_API;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Get the navigate function from react-router-dom

  const handleSignInWithEmail = async () => {
    try {
      await auth.signInWithEmailAndPassword(email, password);
      setError(null);      
      const isLoginValid = await isNotLoggedIn(email);
      if (isLoginValid) {        
        await loginUserSession(email, 'test');
        navigate('/userdetail');
      }     
    } catch (err) {
      setError(err?.data?.message ?? err.message);      
      console.error(err);
    }
  };

  const handleSignInWithGoogle = async () => {
    try {
      console.log('userApi');
      console.log(userApi);
      const provider = new GoogleAuthProvider();
      const response = await signInWithPopup(auth, provider);
      setError(null);      
      const isLoginValid = await isNotLoggedIn(response.user.email);
      if (isLoginValid) {           
        await loginUserSession(response.user.email, response.user.displayName);
        navigate('/userdetail');
      }            
    } catch (err) {
      setError(err?.data?.message ?? err.message);
      await auth.signOut();
      console.error(err);
    }
  };

  const getIp = async () => {
    try {
      const response = await axios.get(ipAddressAPI);
      return response.data.ip;
    } catch (error) {
      console.error('Error getting IP address:', error);
      return null;
    }
  };
  
  const isNotLoggedIn=async(email)=>{
    console.log('isNotLoggedIn');
    console.log(email);
    const response = await axios.post(userApi + 'check-login', {
      loginemail: email
    });
    if (response.status === 200 || response.status === 204) {    
      return true;     
    }    
    else{        
        ErrorPopup('Error: ' + response.data.message);
        setError(response.data.message);
        await auth.signOut();
        return false;
    }                          
  };
  const loginUserSession =async(email,name)=>{
    console.log('loginUserSession');
    console.log(email);
    const myIp = await getIp();
    await axios.post(userApi + 'login', {
        loginemail: email,
        name:name,
        ipAddress:myIp
      });     
  }

  return (
    <div className="container mt-5 bg-light p-4 rounded" style={{ maxWidth: "400px" }}>
    <h2 className="mb-4 text-center">Login</h2>
    {error && <p className="text-danger mb-3">{error}</p>}
    {error && <ErrorPopup message={error} onClose={() => setError(null)} />} {/* Show ErrorPopup when error is not null */}
    <div className="row justify-content-center mb-3">
      <div className="col-sm-12">
        <label htmlFor="email" className="form-label">Email</label>
        <input
          type="email"
          className="form-control"
          id="email"
          placeholder="Email.."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
    </div>
    <div className="row justify-content-center mb-4">
      <div className="col-sm-12">
        <label htmlFor="password" className="form-label">Password</label>
        <input
          type="password"
          className="form-control"
          id="password"
          placeholder="Password.."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
    </div>
    <div className="row justify-content-center mb-4">
      <div className="col-sm-12">
        <button className="btn btn-primary me-3" onClick={handleSignInWithEmail}>Sign in with Email</button>
        <button className="btn btn-danger" onClick={handleSignInWithGoogle}>Sign in with Google</button>
      </div>
    </div>
    <div className="row justify-content-center">
      <div className="col-sm-12">
        <Link to="/register">
          <button className="btn btn-success w-100">Create New Account</button>
        </Link>
      </div>
    </div>
  </div>
  );
};

export { Login };
