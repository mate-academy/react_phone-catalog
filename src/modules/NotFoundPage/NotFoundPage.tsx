import { Link } from 'react-router-dom';
import { getImageUrl } from '../../utils/getImageUrl';
import styles from './NotFoundPage.module.scss';

export const NotFoundPage: React.FC = () => (
  <div className={`container ${styles.page}`}>
    <img
      className={styles.page__image}
      src={getImageUrl('img/page-not-found.png')}
      alt=""
    />
    <h1 className={styles.page__title}>Page not found</h1>
    <Link to="/" className={styles.page__link}>
      Back to Home page
    </Link>
  </div>
);
