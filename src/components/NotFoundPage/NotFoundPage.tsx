import { Link } from 'react-router-dom';

import styles from './NotFoundPage.module.scss';

export const NotFoundPage = () => {
  return (
    <div className={styles['not-found-page']}>
      <div className={styles['not-found-page__wrapper']}>
        <img
          className={styles['not-found-page__image']}
          src={`${import.meta.env.BASE_URL}/img/page-not-found.png`}
          alt="Page not found"
        />
        <h1 className={styles['not-found-page__title']}>Page not found</h1>
        <Link to="/" className={styles['not-found-page__link']}>
          Return to Home
        </Link>
      </div>
    </div>
  );
};
