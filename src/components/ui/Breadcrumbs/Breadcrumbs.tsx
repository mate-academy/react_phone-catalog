import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Breadcrumbs.module.scss';
import HomeIcon from '@/assets/icons/Home.svg?react';
import ArrowRight from '@/assets/icons/ArrowRight.svg?react';

interface Props {
  category: string;
}

export const Breadcrumbs: React.FC<Props> = ({ category }) => {
  return (
    <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
      <Link to="/" className={styles.homeLink}>
        <HomeIcon title="Home" />
      </Link>

      <ArrowRight className={styles.arrow} />
      <span className={styles.current}>{category}</span>
    </nav>
  );
};
