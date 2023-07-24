import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { NotFound } from '../../components/NotFound/NotFound';

export const NotFoundPage:React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const redirectTimer = setTimeout(() => {
      navigate('/');
    }, 1000);

    return () => clearTimeout(redirectTimer);
  }, [navigate]);

  return (
    <NotFound title="Page not found" />
  );
};
