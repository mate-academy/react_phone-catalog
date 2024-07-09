import styles from './Breadcrumbs.module.scss'
import React from 'react';
import {Link} from 'react-router-dom';
import homeIcon from '../../img/icons/HomeIcon.svg';
import chevronIcon from '../../img/icons/ChevronIcon.svg';

export const Breadcrumbs: React.FC = () => {
  return (
    <nav className={styles.breadcrumbs}>
      <Link to="/">
        <img
          src={homeIcon}
          alt="home"
          className={styles.homeIcon}
        />
      </Link>

      <span className={styles.chevronSpan}>
        <img
          src= {chevronIcon}
          alt="arrow"
        />
      </span>

      <Link
        to="/"
        className={styles.label}
      >
        Category
      </Link>

      <span className={styles.chevronSpan}>
        <img
          src= {chevronIcon}
          alt="arrow"
        />
      </span>

      <Link
        to="/"
        className={styles.label}
      >
        Product
      </Link>
    </nav>
  )
}
