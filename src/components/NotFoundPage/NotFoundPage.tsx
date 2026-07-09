import { Link } from 'react-router-dom';
import { Navigation } from '../Navigation/Navigation';
import { Footer } from '../Footer/Footer';
import styles from './NotFoundPage.module.scss';

export const NotFoundPage = () => (
  <div className={styles.wrapper}>
    <Navigation />
    <main className={styles.page}>
      <h1 className={styles.code}>404</h1>
      <p className={styles.text}>Page not found</p>
      <Link to="/" className={styles.link}>
        Go to Home
      </Link>
    </main>
    <Footer />
  </div>
);
