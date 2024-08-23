import styles from './NotFoundPage.module.scss';
import { Link } from 'react-router-dom';

export const NotFoundPage = () => (
  <div>
    <h1 className="title">Page not found</h1>

    <Link className={styles.notFound__wrapper} to="/">
      Return to Home Page
    </Link>
  </div>
);
