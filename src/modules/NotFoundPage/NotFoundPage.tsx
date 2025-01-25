import styles from './NotFoundPage.module.scss';

export const PageNotFound = () => (
  <div className={styles['not-found-page']}>
    <h1>Page not found</h1>

    <div className={styles['not-found-page__content']}>
      <img
        src="./img/page-not-found.png"
        className={styles['not-found-page__image']}
      />
    </div>
  </div>
);
