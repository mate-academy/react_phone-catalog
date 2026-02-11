import { Link } from 'react-router-dom';
import { Container } from '../../components/Container';
import styles from './NotFoundPage.module.scss';

export const NotFoundPage = () => (
  <Container className={styles.wrapper}>
    <img
      src="/img/page-not-found.png"
      alt="Page not found"
      className={styles.image}
    />
    <h1 className={styles.title}>Page not found</h1>
    <Link to="/" className={styles.link}>
      Go home
    </Link>
  </Container>
);
