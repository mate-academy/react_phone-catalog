import React, { useEffect, useState } from 'react';
import style from './Header.module.scss';
import { NavLink, useLocation } from 'react-router-dom';
import { Navigation } from './Navigation';
import { Action } from './Actions/Actions';
import { SideBar } from '../modules/SideBar';

export const Headers: React.FC = () => {
  const [burgerOpen, setBurgerOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setBurgerOpen(!burgerOpen);
  };

  useEffect(() => {
    setBurgerOpen(false);
  }, [location]);

  const links = [
    { title: 'Home', path: '/' },
    { title: 'Phones', path: '/phones' },
    { title: 'Tablets', path: '/tablets' },
    { title: 'Accessories', path: '/accessories' },
  ];

  return (
    <div>
      <div className={style.header}>
        <div className={style.header__container}>
          <NavLink to="/" className={style.header__logoLink}>
            <img
              src="/img/Logo/Logo.png"
              alt="Logo"
              className={style.header__logo}
            />
          </NavLink>

          <div className={style.header__burger}>
            <img
              src={
                burgerOpen ? '/icon/Icons/Close.png' : '/icon/Icons/Menu.png'
              }
              alt={burgerOpen ? 'Close menu' : 'Open menu'}
              className={style.header__icon}
              onClick={toggleMenu}
            />
          </div>

          <div className={style.header__navbar}>
            <Navigation links={links} />
            <Action />
          </div>
        </div>

        <SideBar links={links} burgerOpen={burgerOpen} />
      </div>
    </div>
  );
};
