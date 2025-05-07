import { Link } from 'react-router-dom';
import './NotFoundPage.scss';
import { useEffect, useState } from 'react';
import { Loader } from '../../../components/Loader';

export const NotFoundPage = () => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="not-found-page">
      <div className="not-found-page__container">
        <div className="not-found-page__content">
          <h1 className="not-found-page__code">404</h1>
          <p className="not-found-page__text">page not found</p>
          <Link to="/" className="not-found-page__link">
            Back to home page
          </Link>
        </div>
      </div>
    </div>
  );
};
