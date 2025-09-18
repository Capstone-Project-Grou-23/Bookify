import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const AuthCallback = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');
    const user = params.get('user');

    if (token && user) {
      localStorage.setItem('token', token);
      localStorage.setItem('user', decodeURIComponent(user));
      navigate('/'); // Redirect to homepage
    } else {
      navigate('/login'); // Redirect to login on failure
    }
  }, [location, navigate]);

  return <div>Loading...</div>;
};

export default AuthCallback;
