import { useNavigate } from 'react-router-dom';
import styles from './ErrorPage.module.scss';

export const ErrorPage = () => {
  const navigate = useNavigate();

  const goHome = () => navigate('');

  return (
    <div className={styles.page}>
      <h1 className={styles.page__error}>404</h1>
      <h2 className={styles.page__text}>Sorry, this page does not exist</h2>
      <h3 className={styles.page__text}>
        You can return{' '}
        <span className={styles.page__return} onClick={goHome}>
          to main page
        </span>
      </h3>
    </div>
  );
};
