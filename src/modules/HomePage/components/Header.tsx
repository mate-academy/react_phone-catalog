import React from 'react';
import style from './Header.module.scss';

export const Header: React.FC = () => {
  const navigation = ['HOME', 'PHONES', 'TABLETS', 'ACCESSORIES'];

  return (
    <>
      <header className={style.header}>
        <nav className={style.nav}>
          <div className={style.nav__left}>
            <div className={style.nav__logo}>
              <a href="/">
                <img src="../../public/logo/Logo.png" alt="Logo" />
              </a>
            </div>
            <div className={style.nav__list}>
              <ul className={style.nav__select}>
                {navigation.map(item => (
                  <li className={style.nav__option} key={item}>
                    <a className={style.nav__link} href="/">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className={style.nav__right}>
            <div className={style.nav__heart}>
              <a href="/">
                <img src="../../public/icons/heart.png" alt="Heart" />
              </a>
            </div>
            <div className={style.nav__cart}>
              <a href="/">
                <img src="../../public/icons/cart.png" alt="Cart" />
              </a>
            </div>
            <div className={style.nav__menu}>
              <a href="/">
                <img src="../../public/icons/menu.png" alt="Menu" />
              </a>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};
