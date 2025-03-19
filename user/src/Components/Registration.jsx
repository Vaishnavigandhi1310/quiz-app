import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../assets/Styles/Registration.css';

function Registration() {
  const [name, setName] = useState('');
  const [FatherName, setFatherName] = useState('');
  const [qualification, setQualification] = useState('');
  const [Gender, setGender] = useState('male');
  const [mobile, setMobile] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !FatherName || !qualification || !mobile) {
      toast.error("All fields are required!");
      return;
    }

    if (mobile.length !== 10) {
      toast.error("Mobile number must be 10 digits");
      return;
    }

    const formData = {
      name,
      FatherName,
      qualification,
      Gender,
      mobile
    };

    axios
      .post('http://localhost:8080/user/add', formData)
      .then((response) => {
        if (response.status === 201) {
          toast.success("Registration successful!");
        } else {
          toast.error("Something went wrong, please try again!");
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error("An error occurred while registering. Please try again later.");
      });
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <div className="square-container">
        <h2 className="text-center mb-4">Registration Form</h2>
        <form onSubmit={handleSubmit}>
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
            <label htmlFor="fatherName">Father's Name</label>
            <input
              type="text"
              className="form-control"
              id="fatherName"
              placeholder="Enter father's name"
              value={FatherName}
              onChange={(e) => setFatherName(e.target.value)}
              required
            />
          </div>

          <div className="form-group mt-3">
            <label htmlFor="qualification">Qualification</label>
            <input
              type="text"
              className="form-control"
              id="qualification"
              placeholder="Enter your qualification"
              value={qualification}
              onChange={(e) => setQualification(e.target.value)}
              required
            />
          </div>

          <div className="form-group mt-3">
            <label htmlFor="gender">Gender</label>
            <select
              className="form-control"
              id="gender"
              value={Gender}
              onChange={(e) => setGender(e.target.value)}
              required
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          <div className="form-group mt-3">
            <label htmlFor="mobile">Mobile Number</label>
            <input
              type="text"
              className="form-control"
              id="mobile"
              placeholder="Enter mobile number"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              required
              pattern="[0-9]{10}"
              title="Mobile number must be 10 digits"
            />
          </div>

          <button type="submit" className="btn btn-primary mt-3">
            Submit
          </button>

          <div className="mt-3 text-center">
            <p>
              Already have an account?{' '}
              <a href="/login" className="text-decoration-none">
                Login here
              </a>
            </p>
          </div>

        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Registration;
