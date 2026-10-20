import React from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import styles from './Breadcrumbs.module.scss';
import { asset } from '../../../../helper';

type Props = {
  productName?: string;
  currentLabel?: string;
};

export const Breadcrumbs: React.FC<Props> = ({ productName, currentLabel }) => {
  const { category, id } = useParams<{ category: string; id: string }>();
  const { pathname } = useLocation();

  return (
    <nav className={styles.breadcrumbs}>
      <Link to="/" className={styles.link}>
        <img
          src={asset('img/home.svg')}
          alt="Home"
          className={styles['home-icon']}
        />
      </Link>

      {productName ? (
        <>
          <img
            src={asset('img/arrow-secondary.svg')}
            alt="Arrow"
            className={styles.arrow}
          />
          <Link
            to={`/${category}`}
            className={`${styles.link} ${styles['link-category']}`}
          >
            {category}
          </Link>
          <img
            src={asset('img/arrow-secondary.svg')}
            alt="Arrow"
            className={styles.arrow}
          />
          <Link
            to={`/${category}/${id}`}
            className={`${styles.link} ${styles.current}`}
          >
            {productName}
          </Link>
        </>
      ) : (
        <>
          <img
            src={asset('img/arrow-secondary.svg')}
            alt="Arrow"
            className={styles.arrow}
          />
          <Link to={pathname} className={`${styles.link} ${styles.current}`}>
            {currentLabel ?? category}
          </Link>
        </>
      )}
    </nav>
  );
};
