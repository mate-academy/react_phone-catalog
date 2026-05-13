import styles from './NotFoundPage.module.scss';
import { NavLink } from 'react-router-dom';

export const NotFoundPage = () => {
  return (
    <div className={styles.page}>
      <img
        src="/img/page-not-found.png"
        alt="Empty cart illustration"
        className={styles.page__img}
      />
      <h4 className={styles.page__title}>Page not found</h4>
      <NavLink to="/" className={styles.page__link}>
        Back to Home page
      </NavLink>
    </div>
  );
};
