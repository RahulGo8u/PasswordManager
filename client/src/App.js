import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Login } from './components/Login';
import PasswordList from './components/PasswordList';
import AddPassword from './components/AddPassword';
import { auth } from './firebase'; // Import the firebase auth instance
import UserDetail from './components/UserDetail';
import { Register } from './components/Register'; // Import the Register component
import { Footer } from './components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './App.css';
import Nav from './components/Nav';

function App() {
	const [passwords, setPasswords] = useState([]); // Define the 'passwords' state
	const [user, setUser] = useState(null); // Track the authenticated user
	const [jwtToken, setJwtToken] = useState(null); // State to store JWT token

	const handleAddPassword = (newPassword) => {
		setPasswords([...passwords, newPassword]);
	};

	useEffect(() => {
		// Listen for changes in authentication state
		const unsubscribe = auth.onAuthStateChanged((user) => {
			setUser(user); // Update the authenticated user state
		});

		// Clean up the listener when the component unmounts
		return () => unsubscribe();
	}, []);

	return (
		<div className='App'>
			<Router>
				<Nav />
				<Routes>
					<Route
						path='/'
						element={user ? <Navigate to='/userdetail' /> : <Login setJwtToken={setJwtToken} />}
					/>
					<Route path='/passwords' element={<PasswordList passwords={passwords} />} />
					<Route path='/add' element={<AddPassword onAddPassword={handleAddPassword} />} />
					<Route path='/login' element={<Login setJwtToken={setJwtToken} />} />
					<Route path='/register' element={<Register />} />
					<Route path='/userdetail' element={<UserDetail passwords={passwords} jwtToken={jwtToken} />} />
				</Routes>
				<Footer />
			</Router>
		</div>
	);
}

export default App;
