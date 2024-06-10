import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../components/Input';
import Button from '../components/Button';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if all fields are filled
    if (!email || !password) {
      alert('Please complete all fields.');
      return;
    }

    try {
      // Make the API call to log in
      const response = await axios.post('https://x8ki-letl-twmt.n7.xano.io/api:SSOLzzIz/auth/login', {
        email,
        password
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log('Response:', response);

      if (response.status === 200) {
        // Successfully logged in
        const { authToken } = response.data;
        
        // Save the authToken to local storage (or any state management you prefer)
        localStorage.setItem('authToken', authToken);

        alert('Login successful!');
        navigate('/dashboard'); // Redirect to the dashboard
      } else {
        alert(`Login failed: ${response.data.message || 'Unknown error'}`);
      }
    } catch (error) {
      if (error.response) {
        // Request made and server responded
        console.error('Error response:', error.response.data);
        alert(`Login failed: ${error.response.data.message || 'Invalid credentials'}`);
      } else if (error.request) {
        // Request made but no response received
        console.error('Error request:', error.request);
        alert('Login failed: No response from server.');
      } else {
        // Something happened in setting up the request
        console.error('Error message:', error.message);
        alert(`Login failed: ${error.message}`);
      }
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen">
      {/* Left Section */}
      <div className="lg:w-4/12 w-full flex flex-col justify-center items-center p-6 pt-20">
        <div className="flex flex-col items-center w-full max-w-md">
          <div className="text-center mb-6 ">
            <img src="/images/logo.png" alt="Logo" className="mx-auto" />
            <h1 className="text-2xl font-bold mt-6 mb-2">Log in</h1>
          </div>
          <form className="w-full" onSubmit={handleSubmit}>
            <div className="w-full">
              <label className="block text-pink-500">Email</label>
              <Input
                type="email"
                placeholder="test@test.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="w-full mt-4">
              <label className="block text-pink-500">Password</label>
              <Input
                type="password"
                placeholder="......"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="w-full mt-6">
              <Button type="submit">Log in</Button>
            </div>
          </form>
          <div className="mt-4 w-full">
            <p className="text-sm">
              Don't have an account?{' '}
              <Link to="/signup" className="text-blue-500">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
      {/* Right Section */}
      <div className="hidden lg:block lg:w-8/12">
        <img src="/images/robot.png" alt="Background" className="w-full h-full object-cover" />
      </div>
    </div>
  );
};

export default Login;
