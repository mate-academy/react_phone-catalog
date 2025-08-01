import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.scss';
import notFound from '../../../public/img/page-not-found.png';

export const NotFoundPage = () => (
  <div className={styles.container}>
    <h1 className={styles.title}>Opps, Page Not Found</h1>
    <img className={styles.image} src={notFound} alt="404" />
    <Link to="/" className={styles.button}>
      Home Page
    </Link>
  </div>
);
