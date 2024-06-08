import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../components/Input';
import Button from '../components/Button';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Get user from local storage
    const user = JSON.parse(localStorage.getItem('user'));

    // Check if user exists and password matches
    if (user && user.email === email && user.password === password) {
      alert('Login successful!');
      navigate('/dashboard');
    } else {
      alert('Invalid email or password.');
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
