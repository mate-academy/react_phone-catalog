import { Link } from 'react-router-dom';
import styles from './Breadcrumbs.module.scss';

export const Breadcrumbs = () => {
  return (
    <div className={styles.breadcrumbs}>
      <Link to="/" className={styles.homeLink}>
        <img src="/img/icon/home.svg" alt="Home" />
      </Link>
      <img
        src="/img/icon/chevron-arrow-right.svg"
        alt="Arrow Right"
        className={styles.image}
      />
      <span className={styles.currentPage}>Phones</span>
    </div>
  );
};
