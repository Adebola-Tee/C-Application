import React from 'react';

const Button = ({ type, children }) => {
  return (
    <button
      type={type}
      className="w-full p-2 bg-blue-500 text-white rounded-md"
    >
      {children}
    </button>
  );
};

export default Button;
