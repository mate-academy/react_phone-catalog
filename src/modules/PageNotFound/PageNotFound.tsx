import styles from './PageNotFound.module.scss';
import img from '../../assets/icons/page-not-found.svg';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { useEffect } from 'react';

export const PageNotFound = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  return (
    <section className={styles.container}>
      <div className={styles.notFoundImgWrapper}>
        <img src={img} alt="Page not found" className={styles.notFoundImg} />
      </div>
      <p className={styles.notFoundTitle}>Oops! This page doesn’t exist.</p>
      <Link to={'/'} className={classNames('ctaBtn', styles.homepageBtn)}>
        Let’s get you back on track!
      </Link>
    </section>
  );
};
