import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Protected({ children, authentication = true }) {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  
  
  const authStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    
    if (authentication && authStatus !== authentication) {
      navigate('/login');
    } 
    
    else if (!authentication && authStatus !== authentication) {
      navigate('/');
    }
    
    setLoader(false);
  }, [authStatus, navigate, authentication]);

  return loader ? (
    <div className="flex items-center justify-center w-full h-screen">
      <div className="w-10 h-10 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
    </div>
  ) : (
    <>{children}</>
  );
}