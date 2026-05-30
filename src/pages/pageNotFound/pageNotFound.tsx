import { Link } from 'react-router-dom';
import styles from './pageNotFound.module.scss';
import { Title } from '../../components/title';

export const PageNotFound = () => (
  <div className={styles.pageNotFound}>
    <Title title="pageNotFound" />
    <div className={styles.container}>
      <Link to="/" className={styles.pageNotFoundLink}>
        Home
      </Link>
      <img
        src="./img/page-not-found.png"
        alt="Page Not Found"
        className={styles.pageNotFoundImg}
      />
    </div>
  </div>
);
