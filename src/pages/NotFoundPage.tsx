import { Link } from 'react-router-dom';
import { Breadcrumbs } from '../components/Breadcrumbs';
import styles from '../styles/NotFoundPage.module.scss';

export const NotFoundPage = () => {
  return (
    <div className={styles.notFound}>
      <div className={styles.notFound__container}>
        <Breadcrumbs />

        <h1 className={styles.notFound__title}>Page not found</h1>
        <p className={styles.notFound__text}>
          The page you are looking for does not exist.
        </p>
        <Link to="/" className={styles.notFound__link}>
          Go back to Home
        </Link>
      </div>
    </div>
  );
};
