import React from 'react';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import styles from './notFound.module.scss';
import image from './Pictures/page-not-found.png';
import { NavLink } from 'react-router-dom';

export const NotFoundPage = () => {
  return (
    <>
      <Header />
      <section
        className={styles.notFoundSection}
        style={{ backgroundImage: `url(${image})` }}
      >
        <div className={styles.linkBack}>
          <svg
            className={styles.arrowBack}
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              // eslint-disable-next-line max-len
              d="M5.52876 3.52851C5.78911 3.26816 6.21122 3.26816 6.47157 3.52851L10.4716 7.52851C10.7319 7.78886 10.7319 8.21097 10.4716 8.47132L6.47157 12.4713C6.21122 12.7317 5.78911 12.7317 5.52876 12.4713C5.26841 12.211 5.26841 11.7889 5.52876 11.5285L9.05735 7.99992L5.52876 4.47132C5.26841 4.21097 5.26841 3.78886 5.52876 3.52851Z"
              fill="#0F0F11"
            />
          </svg>
          <NavLink to={'/'}>
            <span className={styles.back}>Back</span>
          </NavLink>
        </div>
        <h1 className={styles.notFoundTitle}>Page not found</h1>
      </section>
      <Footer />
    </>
  );
};
