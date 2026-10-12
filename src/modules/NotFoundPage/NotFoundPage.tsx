import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.scss';

export function NotFoundPage() {
  return (
    <section className={styles.page}>
      <p className={styles.code}>404</p>
      <h1>Page not found</h1>
      <p>The page you are looking for doesn&apos;t exist or has been moved.</p>
      <Link to="/">Go to home</Link>
    </section>
  );
}
