import Menu from '@/molecules/Menu';
import styles from './Header.module.scss';
import BagIcon from '@/assets/icons/shoping_bag.svg?react';
import HeartIcon from '@/assets/icons/heart.svg?react';

import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className={styles.header}>
      <Link className={styles.logo} to="/">
        <div className={styles.logo__img} />
      </Link>
      <div className={styles.header__grid}>
        <Menu />
      </div>
      <nav className={`control ${styles.control}`} aria-label="User actions">
        <Link
          to="/liked"
          className={`${styles.control__button} ${styles.response}`}
        >
          <HeartIcon className={styles.control__icon} />
        </Link>
        <Link
          to="/shopping_bag"
          className={`${styles.control__button} ${styles.response}`}
        >
          <BagIcon className={styles.control__icon} />
        </Link>
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label
          htmlFor="menu-checkbox"
          className={`check-box-label  ${styles.control__button}`}
          tabIndex={0}
          role="button"
        >
          <svg className="menuIcon" width="30" height="30" viewBox="0 0 24 24">
            <line
              className="line1"
              x1="4"
              y1="6"
              x2="20"
              y2="6"
              strokeWidth="2"
            />
            <line
              className="line2"
              x1="4"
              y1="12"
              x2="20"
              y2="12"
              strokeWidth="2"
            />
            <line
              className="line3"
              x1="4"
              y1="18"
              x2="20"
              y2="18"
              strokeWidth="2"
            />
          </svg>
        </label>
      </nav>
    </header>
  );
};

export default Header;
