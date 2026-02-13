import { useLocation } from 'react-router-dom';
import styles from './notFound.module.scss';

const defaultMessage = 'Page not found';

export const NotFoundPage = () => {
  const location = useLocation();

  const state = location.state as { message?: string; from?: string };

  const text = state.message ? state.message : defaultMessage;

  return (
    <div className={styles.container}>
      <span className={styles.sorry}>Oops...</span>
      <h1 className={styles.h1}>{text}</h1>
    </div>
  );
};
