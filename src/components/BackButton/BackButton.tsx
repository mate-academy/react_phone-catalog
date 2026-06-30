import { Link } from 'react-router-dom';
import styles from './BackButton.module.scss';

export const BackButton = () => {
  return (
    <div className={styles.breadcrumbs__back}>
      <span className={styles.breadcrumb__back}></span>

      <Link to="/" className={styles.breadcrumbs__backLink}>
        Back
      </Link>
    </div>
  );
};
