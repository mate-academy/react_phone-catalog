import styles from './NotFoundPage.module.scss';

export const NotFoundPage = () => {
  return (
    <div className={styles['not-found']}>
      <h1 className={styles['not-found__title']}>Page not found</h1>
    </div>
  )
};
