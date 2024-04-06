import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const NotFoundPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timeId = setTimeout(() => {
      navigate('/');
    }, 3000);

    return () => clearTimeout(timeId);
  }, []);

  return (
    <div className="not-found-page">
      <div className="not-found-page__img" />
    </div>
  );
};
