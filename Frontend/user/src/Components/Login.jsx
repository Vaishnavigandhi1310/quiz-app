import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../assets/Styles/Registration.css';

function Login() {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (!name || !mobile) {
      toast.error("All fields are required!");
      return;
    }

    if (mobile.length !== 10) {
      toast.error("Mobile number must be 10 digits");
      return;
    }

    const loginData = { name, mobile };

    axios.post('http://localhost:8080/user/login', loginData)
      .then((response) => {
        if (response.status === 200) {
          toast.success("Login successful!");
          navigate('/dashboard');
        } else {
          toast.error("Invalid credentials, please try again.");
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error("An error occurred while logging in. Please try again later.");
      });
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh', backgroundColor: '#f7f7f7' }}>
      <div className="square-container p-4" style={{ width: '100%', maxWidth: '400px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
        <h2 className="text-center mb-4">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="form-group mt-3">
            <label htmlFor="mobile">Mobile Number</label>
            <input
              type="text"
              className="form-control"
              id="mobile"
              placeholder="Enter your mobile number"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              required
              pattern="[0-9]{10}"
              title="Mobile number must be 10 digits"
            />
          </div>

          <button type="submit" className="btn btn-primary mt-3 w-100">
            Login
          </button>

          <div className="mt-3 text-center">
            <p>
              Don't have an account?{' '}
              <a href="/" className="text-decoration-none">
                Register here
              </a>
            </p>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Login;
