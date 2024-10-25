import { BackLink } from '../../components/BackLink';
import styles from './NotFoundPage.module.scss';

export const NotFoundPage = () => {
  return (
    <div className={styles['not-found-page']}>
      <BackLink />
      <h1 className={styles['not-found-page__title']}>Page not found</h1>
      <img
        className={styles['not-found-page__img']}
        src="/img/page-not-found.png"
        alt="Page not found"
      />
    </div>
  );
};
