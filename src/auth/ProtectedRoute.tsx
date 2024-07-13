import React, { PropsWithChildren, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/AuthProvider';

const ProtectedRoute = ({ children }: PropsWithChildren<{}>) => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn()) {
      console.log('Redirecting to /auth/login');
      navigate('/auth/login', { replace: true });
    }
  }, [isLoggedIn, navigate]);

  return <>{children}</>;
};

export default ProtectedRoute;
