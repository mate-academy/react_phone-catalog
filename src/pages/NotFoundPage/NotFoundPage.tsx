import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.scss';
import { getPublicUrl } from '../../utils/getPublicUrl';

export const NotFoundPage = () => (
  <main className={styles.main}>
    <div className={styles.illustration}>
      <img
        className={styles.imageLight}
        src={getPublicUrl('/img/page-not-found.png')}
        alt="Page not found illustration"
      />

      <img
        className={styles.imageDark}
        src={getPublicUrl('/img/page-not-found-dark.png')}
        alt="Page not found illustration"
      />
    </div>

    <h1 className={styles.title}>Page not found</h1>

    <Link to="/" className={styles.homeLink}>
      Back to home
    </Link>
  </main>
);
