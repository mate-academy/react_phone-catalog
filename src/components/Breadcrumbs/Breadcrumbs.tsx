import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import icons from '../../assets/icons/icons.svg';
import styles from './Breadcrumbs.module.scss';

interface BreadcrumbsProps {
  name?: string;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ name }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const pathnames = pathname.split('/').filter(Boolean);
  const category = pathnames[0] || '';

  const isOnCategoryPage = pathnames.length === 1;
  const isOnProductPage = pathnames.length > 1;

  const isHomeActive = pathnames.length > 0;

  return (
    <div className={styles.breadcrumbsContainer}>
      <button
        className={`${styles.navigationHome} ${isHomeActive ? styles.active : ''}`}
        onClick={() => navigate('/')}
      >
        <span className={styles.homeBtn}>
          <svg>
            <use href={`${icons}#home-icon`}></use>
          </svg>
        </span>
      </button>

      {category &&
        (isOnCategoryPage ? (
          <div className={`${styles.navigationCategory} ${styles.current}`}>
            <span className={styles.arrowRight}>
              <svg>
                <use href={`${icons}#arrow-right-icon`}></use>
              </svg>
            </span>
            <span className={styles.productName}>{category}</span>
          </div>
        ) : (
          <button
            className={`${styles.navigationCategory} ${isOnProductPage ? styles.active : ''}`}
            onClick={() => navigate(`/${category}`)}
          >
            <span className={styles.arrowRight}>
              <svg>
                <use href={`${icons}#arrow-right-icon`}></use>
              </svg>
            </span>
            <span className={styles.productName}>{category}</span>
          </button>
        ))}

      {name && (
        <div className={styles.wrapper}>
          <span className={styles.arrowRight}>
            <svg>
              <use href={`${icons}#arrow-right-icon`}></use>
            </svg>
          </span>
          <span className={styles.productName}>{name}</span>
        </div>
      )}
    </div>
  );
};
