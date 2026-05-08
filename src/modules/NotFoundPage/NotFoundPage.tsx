import { NOTFOUND_IMAGES } from '../../constants';
import styles from './NotFoundPage.module.scss';

export const NotFoundPage = () => {
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Page not found</h1>
      <img
        src={NOTFOUND_IMAGES.PAGE_NOT_FOUND}
        alt="Page not found"
        className={styles.image}
      />
    </div>
  );
};
