import React from 'react';
import style from './Header.module.scss';
import { Logo } from '../../shared/Logo/Logo';
import { BurgerMenu } from '../../shared/BurgerMenu/BurgerMenu';
import { Favorite } from '../../shared/Favorite/Favorite';
import { BagCard } from '../../shared/Bags/Bags';

export const Header: React.FC = () => {
  return (
    <div className={style.container}>
      <div className={style.wrapper}>
        <div className={style.logo}>
          <Logo />
        </div>

        <nav className={style.nav}>
          <ul className={style.list}>
            <li className={style.item}>
              <a href="#" className={`${style.link} ${style.active}`}>
                Home
              </a>
            </li>

            <li className={style.item}>
              <a href="#" className={style.link}>
                Phones
              </a>
            </li>

            <li className={style.item}>
              <a href="#" className={style.link}>
                Tablets
              </a>
            </li>

            <li className={style.item}>
              <a href="#" className={style.link}>
                Accessories
              </a>
            </li>
          </ul>
        </nav>

        <div className={style.rightContent}>
          <div className={style.rightIcons}>
            <div className={style.favorite}>
              <Favorite />
            </div>

            <div className={style.bags}>
              <BagCard />
            </div>
          </div>

          <div className={style.burger}>
            <BurgerMenu />
          </div>
        </div>
      </div>
    </div>
  );
};
