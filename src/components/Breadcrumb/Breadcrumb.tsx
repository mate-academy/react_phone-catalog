import React from 'react';
import styles from './Breadcrumb.module.scss';
import { Link } from 'react-router-dom';
import { useTheme } from '../../hooks/useTheme';

interface Props {
  current: string;
}

export const Breadcrumb: React.FC<Props> = ({ current }) => {
  const { theme } = useTheme();

  return (
    <div className={styles.breadcrumb}>
      <Link to="/" className={styles.homeLink}>
        <img
          src={`/react_phone-catalog/img/icons/home-${theme}.svg`}
          alt="Home"
          className={styles.homeIcon}
        />
      </Link>
      <img
        src={`/react_phone-catalog/img/icons/arrow-right-${theme}.svg`}
        alt="Arrow"
        className={styles.arrowIcon}
      />
      <span className={styles.currentPage}>{current}</span>
    </div>
  );
};
