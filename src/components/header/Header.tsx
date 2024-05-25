import React from 'react';
import styles from './Header.module.scss';

export const Header: React.FC = () => {
  return (
    <><header className={styles.header}>
      <div className={styles[`header__container--1`]}>
        <img src=".\img\svg\Nice Gadgets_logo.svg" className="logo" />

        <nav>
          <ul className={styles[`header__nav__list`]}>
            <li className={styles[`header__nav__element`]}>Home</li>
            <li className={styles[`header__nav__element`]}>Phones</li>
            <li className={styles[`header__nav__element`]}>Tablets</li>
            <li className={styles[`header__nav__element`]}>Accessories</li>
          </ul>
        </nav>
      </div>

      <div className={styles[`header__container--2`]}>
        <a href="#fav" className="header__fav">
          <img
            src=".\img\svg\fav_icon.svg"
            alt="Fav_logo"
            className="logo__image" />
        </a>
        <a href="#cart" className={styles[`header__cart`]}>
          <img
            src="./img/svg/Shopping_bag_Cart.svg"
            alt="Cart_logo"
            className="logo__image" />
        </a>
      </div>
    </header><main>
        <p className='bg-green-600'>siema to ja</p>
      </main></>
  );
};
