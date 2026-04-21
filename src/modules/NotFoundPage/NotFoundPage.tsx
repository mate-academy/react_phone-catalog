import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './NotFoundPage.module.scss';
import notFoundPage from '../../images/other_images/page-not-found.png';

export const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const REDIRECT_DELAY = 3000;

    const timeout = setTimeout(() => {
      navigate('/', { replace: true });
    }, REDIRECT_DELAY);

    return () => clearTimeout(timeout);
  }, [navigate]);

  return (
    <section className="container">
      <div className={styles.nfPage}>
        <h2 className={styles.nfPage_title}>Page Not Found</h2>
        <img
          src={notFoundPage}
          alt="Showing that the requested page was not found"
          className={styles.nfPage_img}
        />
        <p style={{ textAlign: 'center', marginTop: '20px' }}>
          You will be redirected to the home page in a few seconds...
        </p>
      </div>
    </section>
  );
};
