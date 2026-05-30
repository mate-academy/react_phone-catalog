//hooks
import { useEffect } from 'react';

//react-router
import { useNavigate } from 'react-router-dom';

//styles
import styles from './NotFoundPage.module.scss';

//components
import { Button } from '../../components/Button';

//assets
import pageNotFoundImage from '/img/page-not-found.png';

export const NotFoundPage = () => {
  const navigate = useNavigate();
  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0 });
  };

  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <div className={styles.page}>
      <img
        src={pageNotFoundImage}
        alt="page-not-found"
        className={styles.image}
      />

      <h1 className={styles.title}>Something went wrong...</h1>

      <Button
        variant="secondary"
        className={styles.button}
        onClick={() => navigate('/')}
      >
        <h2>Go Back</h2>
      </Button>
    </div>
  );
};
