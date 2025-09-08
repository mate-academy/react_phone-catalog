import { Link } from 'react-router-dom';

import styles from './NotFoundPage.module.scss';

export const NotFoundPage = () => {
  return (
    <div className={styles.notFound}>
      <Link to={'/'} className={styles.notFoundLink}>
        <img className={styles.notFoundLinkArrow} src='/src/assets/icons/arrow-left.svg' alt='Arrow Left'/>
        Back to home
      </Link>
      <h1>Page Not Found</h1>
        <div className={styles.notFoundImg}>
          <img src="/src/assets/img/page-not-found.png" alt="Page Not Found Image" />
        </div>
    </div>
  );
};
