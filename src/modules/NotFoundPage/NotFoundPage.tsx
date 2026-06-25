import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.scss';

export const NotFoundPage = () => {
  return (
    <div className={styles.status}>
      Page not found
      <img
        src="./img/image/NotFound/pageNotFound.png"
        alt="Product not found"
      />
      <Link to="/">Go back to Home</Link>
    </div>
  );
};
