import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.scss';
import { Header } from '../../../components/Header';
import { Footer } from '../../../components/Footer';

export const NotFoundPage = () => (
  <>
    <Header />
    <main className={styles.main}>
      <div className={styles.container}>
        <img
          src="img/page-not-found.png"
          alt="Page not found"
          className={styles.image}
        />
        <h1 className={styles.title}>Page not found</h1>
        <Link to="/" className={styles.link}>
          Go to home page
        </Link>
      </div>
    </main>
    <Footer />
  </>
);
