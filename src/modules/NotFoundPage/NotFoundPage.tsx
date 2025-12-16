import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.scss';
import { Container } from '../shared/components/Container';

export const NotFoundPage = () => {
  return (
    <Container>
      <div className={styles.root}>
        <h1 className={styles.title}>Page not found</h1>

        <p className={styles.text}>
          Sorry, the page you are looking for doesn’t exist.
        </p>

        <Link to="/" className={styles.link}>
          Go to HomePage
        </Link>
      </div>
    </Container>
  );
};
