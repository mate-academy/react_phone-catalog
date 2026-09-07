import { useNavigate } from 'react-router-dom';
import styles from './NotFoundPage.module.scss';

export const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.notFound}>
      <h1 className={styles.title}>Page Not Found</h1>
      <p className={styles.message}>
        The page you are looking for does not exist
      </p>

      <button className={styles.button} onClick={() => navigate('/')}>
        Back to Home
      </button>
    </div>
  );
};
