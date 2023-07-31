import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import axios from 'axios'; // Import Axios
import CryptoJS from 'crypto-js';
import { Input, Button } from 'react-carbonui';
import { auth } from '../firebase';

function AddPassword({ onAddPassword }) {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [url, setUrl] = useState('');
	const secretKey = process.env.REACT_APP_SECRET_KEY;
	const userPasswordAPI = process.env.REACT_APP_USER_PASSWORD_API;
	const handleSubmit = async (e) => {
		e.preventDefault();
		const encryptText = (message) => {
			const ciphertext = CryptoJS.AES.encrypt(message, secretKey).toString();
			return ciphertext;
		};
		const newPassword = {
			username,
			password,
			url,
		};
		try {
			const encryptedPwd = encryptText(password);
			const response = await axios.post(userPasswordAPI +'add', {
				loginemail: auth.currentUser?.email,
				email: username,
				password: encryptedPwd,
				url,
			});

			console.log(response.data); // Response message from the server
			onAddPassword(newPassword);
			setUsername('');
			setPassword('');
			setUrl('');
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className='container pt-5 mt-5 row'>
			<div className='col-sm-12 col-lg-6'>
				<img src='./images/password_store.svg' alt='password' />
			</div>
			<div className='col-sm-12 col-md-6'>
				<h2>Add New Password</h2>
				<hr />
				<Form onSubmit={handleSubmit}>
					<Form.Group className='mb-3' controlId='username'>
						<Form.Label>Username:</Form.Label>
						<Input
							title='Username / Email'
							value={username}
							fullWidth
							onChange={(e) => setUsername(e.target.value)}
						/>
					</Form.Group>

					<Form.Group className='mb-3' controlId='password'>
						<Form.Label>Password:</Form.Label>
						<Input
							placeholder='Password'
							fullWidth
							type='password'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</Form.Group>

					<Form.Group className='mb-3' controlId='url'>
						<Form.Label>URL:</Form.Label>
						
						<Input
              placeholder='URL'
              fullWidth
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
					</Form.Group>

					<Button variant='primary' type='submit'>
						Add Password
					</Button>
				</Form>
			</div>
		</div>
	);
}

export default AddPassword;
