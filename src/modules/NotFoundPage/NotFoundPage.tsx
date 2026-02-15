import { useEffect } from 'react';
import imagePageNotFound from '../../api/img/page-not-found.png';
import { useNavigate } from 'react-router-dom';

export const NotFoundPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate('..');
    }, 3000);

    return () => clearTimeout(timeout);
  }, [navigate]);

  return (
    <section className="container">
      <div className="page-not-found">
        <h2>Page Not Found</h2>
        <p>The page you are looking for does not exist.</p>
        <img src={imagePageNotFound} alt="" />
      </div>
    </section>
  );
};
