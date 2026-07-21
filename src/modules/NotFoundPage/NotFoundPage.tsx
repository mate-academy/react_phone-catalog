import classNames from 'classnames';
import { Link } from 'react-router-dom';

import styles from './NotFoundPage.module.scss';

export const NotFoundPage = () => {
  return (
    <section className={classNames(styles.notFoundPage, 'container')}>
      <img
        className={styles.notFoundPage__image}
        src="img/page-not-found.png"
        alt=""
      />

      <h1 className={styles.notFoundPage__title}>Page not found</h1>

      <Link className={styles.notFoundPage__homeLink} to="/">
        Go to homepage
      </Link>
    </section>
  );
};
