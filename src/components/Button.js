import React from 'react';

const Button = ({ children, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-full p-2 bg-blue-500 text-white rounded-md"
    >
      {children}
    </button>
  );
};

export default Button;
