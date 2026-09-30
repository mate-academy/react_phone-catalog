import { useNavigate } from 'react-router-dom';
import styles from './NotFoundPage.module.scss';

export const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/', { replace: true });
  };

  return (
    <main className={styles.container}>
      <div className={styles.content}>
        <div className={styles.errorCode} aria-hidden="true">
          404
        </div>

        <h1 className={styles.title}>Page not found</h1>

        <p className={styles.description}>
          We couldn&apos;t find the page you were looking for. It might have
          been moved, deleted, or never existed.
        </p>
        <button
          type="button"
          onClick={handleGoHome}
          className={styles.backButton}
        >
          Back to Home
        </button>
      </div>
    </main>
  );
};
