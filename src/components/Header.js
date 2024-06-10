import React from 'react';
import { useNavigate } from 'react-router-dom';

function Header() {

    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('authToken');
        navigate('/login');
      };
    return (
      
        <div className="flex items-center justify-between p-4 border-b">
        <img src="/images/logo.png" alt="Logo" className="h-8" />
        <button
  onClick={handleLogout}
  className="bg-custom-purple text-white px-4 py-2 rounded font-manrope"
  style={{ width: '98px', height: '36px' }}
>
  Logout
</button>

      </div>
       
    );
}

export default Header;