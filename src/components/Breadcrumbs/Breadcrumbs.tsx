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

  const category = pathname.split('/')[1];

  return (
    <div className={styles.breadcrumbsContainer}>
      <button
        className={styles.navigationHome}
        onClick={() => navigate(`/${category}`)}
      >
        <span className={styles.homeBtn}>
          <svg>
            <use href={`${icons}#home-icon`}></use>
          </svg>
        </span>
        <span className={styles.arrowRight}>
          <svg>
            <use href={`${icons}#arrow-right-icon`}></use>
          </svg>
        </span>
        <span className={styles.productName}>{category}</span>
      </button>

      {name && (
        <div className={styles.wrapper}>
          <span className={styles.arrowRight}>
            <svg>
              <use href={`${icons}#arrow-right-icon`}></use>
            </svg>
          </span>
          {name}
        </div>
      )}
    </div>
  );
};
