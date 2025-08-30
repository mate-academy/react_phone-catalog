// src/modules/not-found/NotFoundPage.tsx - 404 page component
import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.scss';

export const NotFoundPage: React.FC = () => (
  <div className={styles.container}>
    <h1 className={styles.heading}>Page not found</h1>
    <p>
      <Link to="/" className={styles.link}>
        Go Home
      </Link>
    </p>
  </div>
);
