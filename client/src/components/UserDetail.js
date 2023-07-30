import React from 'react';
import { auth } from '../firebase';
import { Container, Row, Col } from 'react-bootstrap'; // Import Bootstrap components

const UserDetail = ({ passwords, jwtToken }) => {
	return (
		<Container>
			<Row className='mt-4'>
				<Col xs={12} md={6}>
					{/* Display user's name and email */}
					<h3>Welcome, {auth.currentUser?.displayName}</h3>
					<p>Email: {auth.currentUser?.email}</p>
				</Col>
				<Col xs={12} md={6}>
					{/* Display user's profile photo if available */}
					{auth.currentUser?.photoURL && (
						<img
							src={auth.currentUser.photoURL}
							alt='Profile'
							className='img-thumbnail float-md-end'
							style={{ width: '200px' }}
						/>
					)}
				</Col>
			</Row>
		</Container>
	);
};

export default UserDetail;
