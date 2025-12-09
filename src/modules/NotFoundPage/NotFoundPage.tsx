import React from 'react';
import styles from './NotFoundPage.module.scss';
import photo from '../../../public/img/door.webp';
import gor from '../../../public/img/gor.jpg';
const NotFoundPage = () => {
  return (
    <div className={styles.notFoundPage}>
      <h1 className={styles.title}>404 - Page Not Found - Наведи на двері</h1>
      <div className={styles['img-box']}>
        NotFoundPage
        <img
          className={styles['img-default']}
          src={photo}
          alt="404 Not Found"
        />
        <img className={styles['img-hover']} src={gor} alt="404 Not Found" />
      </div>
    </div>
  );
};

export default NotFoundPage;
