import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.scss';

export function NotFoundPage(): JSX.Element {
  return (
    <main className={styles.main} role="main">
      <div className={styles.container}>
        <h1 className={styles.title}>Page not found</h1>
        <Link to="/" className={styles.link}>
          Go to Home
        </Link>
      </div>
    </main>
  );
}
