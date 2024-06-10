import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Input from '../components/Input';
import Button from '../components/Button';
import axios from 'axios';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Check if all fields are filled
    if (!email || !name || !password || !confirmPassword) {
      alert('Please complete all fields.');
      return;
    }

    // Validate email format
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address.');
      return;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    // Sign up using API
    try {
      const response = await axios.post('https://x8ki-letl-twmt.n7.xano.io/api:SSOLzzIz/auth/signup', {
        name,
        email,
        password,
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log('Response:', response);

      if (response.status === 200) {
        alert('Sign-up successful! Please log in.');
        window.location.href = '/login';
      } else {
        alert(`Sign-up failed: ${response.data.message || 'Unknown error'}`);
      }
    } catch (error) {
      if (error.response) {
        // Request made and server responded
        console.error('Error response:', error.response.data);
        alert(`Sign-up failed: ${error.response.data.message || 'Unknown error'}`);
      } else if (error.request) {
        // Request made but no response received
        console.error('Error request:', error.request);
        alert('Sign-up failed: No response from server.');
      } else {
        // Something happened in setting up the request
        console.error('Error message:', error.message);
        alert(`Sign-up failed: ${error.message}`);
      }
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen">
      {/* Left Section */}
      <div className="lg:w-4/12 w-full flex flex-col justify-center items-center p-6 pt-24 pb-20">
        <div className="flex flex-col items-center w-full max-w-md">
          <div className="text-center mb-6">
            <img src="/images/logo.png" alt="Logo" className="mx-auto mt-4" />
            <h1 className="text-2xl font-bold mt-6 mb-2">Sign Up</h1>
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
              <label className="block text-pink-500">Name</label>
              <Input
                type="text"
                placeholder="Firstname Lastname"
                value={name}
                onChange={(e) => setName(e.target.value)}
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
            <div className="w-full mt-4">
              <label className="block text-pink-500">Confirm Password</label>
              <Input
                type="password"
                placeholder="......"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <div className="w-full mt-6">
              <Button type="submit">Sign Up</Button>
            </div>
          </form>
          <div className="mt-4 w-full">
            <p className="text-sm">
              Already have an account?{' '}
              <Link to="/login" className="text-blue-500">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
      {/* Right Section */}
      <div className="hidden lg:block lg:w-8/12">
        <img
          src="/images/robot.png"
          alt="Background"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default SignUp;
