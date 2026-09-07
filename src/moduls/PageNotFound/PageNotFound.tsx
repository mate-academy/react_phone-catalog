/* eslint-disable react/no-unescaped-entities */
import page404 from '../../../public/img/page-not-found.png';
import styles from './PageNotFound.module.scss';

export const PageNotFound = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.text}>
        <h1>Page not found</h1>
        <p>
          The page you're looking for might have been removed or doesn't exist.
        </p>
      </div>
      <img src={page404} alt="page not found" className={styles.img} />
    </div>
  );
};
