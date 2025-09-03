import React from 'react';
import '@/styles/main.scss';
import classNames from 'classnames';
import styles from './NotFoundPage.module.scss';
import { Link } from 'react-router-dom';

export const NotFound: React.FC = () => {
  return (
    <main className="container">
      <div className={styles.not_found}>
        <img
          className={styles['not_found--image']}
          src="/img/page-not-found.png"
          alt="404"
        />
        <p className={classNames(styles['not_found--text'], 'text__body')}>
          Oops, the page doesn&apos;t exist :(
        </p>
        <Link
          className={classNames(styles['not_found--link'], 'text__body')}
          to="/"
        >
          Back to home
        </Link>
      </div>
    </main>
  );
};
