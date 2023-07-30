import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase'; // Import the firebase auth instance
import { Button, NavDropdown } from 'react-bootstrap'; // Import the Bootstrap Button component
import axios from 'axios';

function Nav() {
	const navigate = useNavigate();
	const userApi = process.env.REACT_APP_USER_API;
	// Function to handle the logout
	const handleLogout = async () => {
		try {
			await logoutUserSession();
			await auth.signOut();
			navigate('/login'); // Redirect to login page after logout
		} catch (error) {
			console.error(error);
		}
	};

	// Check if the user is logged in
	const isUserLoggedIn = !!auth.currentUser;

	const logoutUserSession = async () => {
		console.log('logoutUserSession');
		console.log(auth.currentUser?.email);
		await axios.post(userApi+'logout', {
			loginemail: auth.currentUser?.email,
		});
	};

	return (
		<nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
			<div className='container-fluid'>
				<Link to='/' className='navbar-brand'>
					Password Manager
				</Link>
				<button
					className='navbar-toggler'
					type='button'
					data-bs-toggle='collapse'
					data-bs-target='#navbarNav'
					aria-controls='navbarNav'
					aria-expanded='false'
					aria-label='Toggle navigation'
				>
					<span className='navbar-toggler-icon'></span>
				</button>
				<div className='collapse navbar-collapse' id='navbarNav'>
					<ul className='navbar-nav ms-md-auto gap-2'>
						{/* Show "Login" link only if the user is not logged in */}
						{!isUserLoggedIn && (
							<li className='nav-item'>
								<Link to='/' className='nav-link'>
									Login
								</Link>
							</li>
						)}
						{/* Show other links after login */}
						{isUserLoggedIn && (
							<>
								<li className='nav-item'>
									<Link to='/passwords' className='nav-link'>
										Password List
									</Link>
								</li>
								<li className='nav-item'>
									<Link to='/add' className='nav-link'>
										Add Password
									</Link>
								</li>

								<NavDropdown title={`Hi ${auth.currentUser?.displayName}`} id='basic-nav-dropdown'>
									<NavDropdown.Item onClick={() => navigate('/add')}>Add Password</NavDropdown.Item>
									<NavDropdown.Item onClick={() => navigate('/userdetail')}>Profile</NavDropdown.Item>

									<NavDropdown.Divider />
									<NavDropdown.Item href='#'>
										<li className='nav-item'>
											<Button variant='outline-danger' onClick={handleLogout}>
												Logout
											</Button>
										</li>
									</NavDropdown.Item>
								</NavDropdown>
								<div className='d-flex flex-items-center'>
									<img
										src={auth.currentUser?.photoURL}
										class='rounded-circle'
										style={{ width: '50px' }}
										alt='Avatar'
									/>
								</div>
							</>
						)}
					</ul>
				</div>
			</div>
		</nav>
	);
}

export default Nav;
