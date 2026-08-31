import { getPublicPath } from '../shared/utils/getPublicPath';
import styles from './NotFoundPage.module.scss';

export const NotFoundPage = () => (
  <div className={styles.notFound}>
    <img
      className={styles.notFoundImg}
      src={getPublicPath('img/page-not-found.png')}
      alt="Page not found"
    />
    <h1>Page not found</h1>
  </div>
);
