import React from 'react';
import { Link } from 'react-router-dom';
import { PathType } from '../../types/Types';
import noFoundPageImage from '../../../public/img/page-not-found.png';
import styles from './NotFoundPage.module.scss';

export const NotFoundPage: React.FC = () => {
  return (
    <>
      <div className={styles.notFound__emptyContent}>
        <h2 className={styles.notFound__emptyText}>Page not found</h2>
        <img
          src={noFoundPageImage}
          alt="No found page"
          className={styles.notFound__emptyImage}
        />
      </div>
      <Link to={PathType.HOME} className={styles.notFound__back}>
        Back to home page
      </Link>
    </>
  );
};
