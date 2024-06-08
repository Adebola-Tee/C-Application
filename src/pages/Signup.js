import React from 'react';
import { Link } from 'react-router-dom';
import Input from '../components/Input';
import Button from '../components/Button';

const SignUp = () => {
  return (
    <div className="flex flex-col lg:flex-row h-screen">
      {/* Left Section */}
      <div className="lg:w-4/12 w-full flex flex-col justify-center items-center p-6 pt-24 pb-20">
        <div className="flex flex-col items-center w-full max-w-md">
          <div className="text-center mb-6">
            <img src="/images/logo.png" alt="Logo" className="mx-auto mt-4" />
            <h1 className="text-2xl font-bold mt-6 mb-2">Sign Up</h1>
          </div>
          <div className="w-full">
            <label className="block text-pink-500">Email</label>
            <Input type="email" placeholder="test@test.com" />
          </div>
          <div className="w-full mt-4">
          <label className="block text-pink-500">Name</label>
          <Input type="text" placeholder="Firstname Lastname" />
        </div>
          <div className="w-full mt-4">
            <label className="block text-pink-500">Password</label>
            <Input type="password" placeholder="......" />
          </div>
          <div className="w-full mt-4">
          <label className="block text-pink-500">Confirm Password</label>
          <Input type="password" placeholder="......" />
        </div>
          <div className="w-full mt-6">
            <Button>Sign Up</Button>
          </div>
          <div className="mt-4 w-full">
            <p className="text-sm">Already have an account? <Link to="/login" className="text-blue-500">Log in</Link></p>
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

export default SignUp;
