import Menu from '@/molecules/Menu';
import styles from './Header.module.scss';
import BagIcon from '@/assets/icons/shoping_bag.svg?react';
import HeartIcon from '@/assets/icons/heart.svg?react';
import MenuIcon from '@/assets/icons/menu.svg?react';
import CloseIcon from '@/assets/icons/close.svg?react';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo} />
      <Menu />
      <div className={`control ${styles.control}`}>
        <a className={`${styles.control__button} ${styles.response}`}>
          <HeartIcon className={styles.control__icon} />
        </a>
        <a className={`${styles.control__button} ${styles.response}`}>
          <BagIcon className={styles.control__icon} />
        </a>
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label
          htmlFor="menu-checkbox"
          className={`${styles.control__button} open`}
        >
          <MenuIcon className={styles.control__icon} />
        </label>
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label
          htmlFor="menu-checkbox"
          className={`${styles.control__button} close`}
        >
          <CloseIcon className={styles.control__icon} />
        </label>
      </div>
    </header>
  );
};

export default Header;
