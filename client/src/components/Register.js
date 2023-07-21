import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import the Link and useNavigate hooks

export const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Initialize the useNavigate hook

  const registerUser = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      // Redirect to login page after successful registration
      navigate("/login"); // Use navigate to redirect to the login page
    } catch (err) {
      setError(err.message);
      console.error(err);
    }
  };

  return (
    <div>
      <input
        placeholder="Email.."
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password.."
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={registerUser}>Register</button>
      <Link to="/">
        <p>Already have an account? Login here.</p>
      </Link>
      {error && <p>{error}</p>}
    </div>
  );
};
