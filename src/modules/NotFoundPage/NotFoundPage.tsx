import { Link } from 'react-router-dom';

import styles from './NotFoundPage.module.scss';

export const NotFoundPage: React.FC = () => {
  return (
    <div className={styles.notFoundPage}>
      <div className={styles.back}>
        <Link to="/">
          <div className={styles.backContainer}>
            <img
              className={styles.arrowIcon}
              src="img/icons/arrow-down-light-gray.svg"
              alt="arrow-back"
            />
            Back to home
          </div>
        </Link>
      </div>

      <h1 className={styles.notFoundMessage}>Page not found</h1>
      <img
        className={styles.notFoundImg}
        src="img/page-not-found.png"
        alt="Page not found"
      />
    </div>
  );
};
