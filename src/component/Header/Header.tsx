import React, { useEffect, useState } from 'react';
import style from './Header.module.scss';
import { useLocation } from 'react-router-dom';
import Logo from '../../../public/img/Logo/Logo.png';
import burger from '../../../public/icon/Icons/Menu.png';
import close from '../../../public/icon/Icons/Close.png';
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
          <a href="/home" className={style.header__logoLink}>
            <img src={Logo} className={style.header__logo} />
          </a>

          <div className={style.header__burger}>
            <img
              src={burgerOpen ? close : burger}
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
