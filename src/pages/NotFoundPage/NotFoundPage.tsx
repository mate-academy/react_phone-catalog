import styles from './NotFoundPage.module.scss';

import imgNotFound from '/img/page-not-found.png';

export const NotFoundPage = () => {
  return (
    <div className={styles['page-not-found']}>
      <h1 className="title">Page not found</h1>
      <img
        src={imgNotFound}
        alt="Not Found Img"
        className={styles['page-not-found__img']}
      />
    </div>
  );
};
