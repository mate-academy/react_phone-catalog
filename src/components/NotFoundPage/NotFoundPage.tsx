import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './NotFoundPage.module.scss';

export const NotFoundPage = () => {
  const timeoutId = useRef<number>(0);
  const navigate = useNavigate();

  useEffect(() => {
    timeoutId.current = window.setTimeout(() => {
      navigate('/');
    }, 3000);

    return () => {
      window.clearTimeout(timeoutId.current);
    };
  }, [navigate]);

  return (
    <div className={styles.notFoundPage}>
      <p className={styles.notFoundTxt}>Page not found</p>
    </div>
  );
};
