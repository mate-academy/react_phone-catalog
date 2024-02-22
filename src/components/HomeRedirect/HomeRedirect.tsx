import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomeRedirect.scss';

export const HomeRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/', { replace: true });
  }, [navigate]);

  return (null);
};
