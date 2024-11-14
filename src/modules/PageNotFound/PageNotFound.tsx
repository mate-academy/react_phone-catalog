import styles from './PageNotFound.module.scss';
import img from '../../assets/icons/page-not-found.svg';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

export const PageNotFound = () => {
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
