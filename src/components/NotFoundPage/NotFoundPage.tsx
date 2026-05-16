import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './NotFoundPage.module.scss';
import { NavLink } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/');
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className={`page__wrapper-center ${styles['not-found-page']}`}>
      <p className={styles['not-found-page__text']}>
        You will be redirected to the home page in 5 seconds...
      </p>
      <NavLink to="/" className={styles['not-found-page__link']}>
        Home
      </NavLink>
    </div>
  );
};

export default NotFoundPage;
