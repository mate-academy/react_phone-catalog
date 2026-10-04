import { Link } from 'react-router-dom';
import { Container } from '../shared/components/Container';
import styles from './NotFoundPage.module.scss';

export const NotFoundPage = () => (
  <Container className={styles.page}>
    <h1>Page not found</h1>
    <p className={styles.text}>
      The page you are looking for does not exist or was moved.
    </p>
    <Link to="/" className={styles.button}>
      Go to Home page
    </Link>
  </Container>
);
