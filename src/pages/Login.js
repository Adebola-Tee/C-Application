import React from 'react';
import { Link } from 'react-router-dom';
import Input from '../components/Input';
import Button from '../components/Button';

const Login = () => {
  return (
    <div className="flex flex-col lg:flex-row h-screen">
      {/* Left Section */}
      <div className="lg:w-4/12 w-full flex flex-col justify-center items-center p-6 pt-20">
        <div className="flex flex-col items-center w-full max-w-md">
          <div className="text-center mb-6 ">
            <img src="/images/logo.png" alt="Logo" className="mx-auto" />
            <h1 className="text-2xl font-bold mt-6 mb-2">Log in</h1>
          </div>
          <div className="w-full">
            <label className="block text-pink-500">Email</label>
            <Input type="email" placeholder="test@test.com" />
          </div>
          <div className="w-full mt-4">
            <label className="block text-pink-500">Password</label>
            <Input type="password" placeholder="......" />
          </div>
          <div className="w-full mt-6">
            <Button>Log in</Button>
          </div>
          <div className="mt-4  w-full">
            <p className="text-sm">Don't have an account? <Link to="/signup" className="text-blue-500">Sign up</Link></p>
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
