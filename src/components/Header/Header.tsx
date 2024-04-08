import React, { useEffect } from "react";
import style from'./Header.module.scss';
import * as productAction from '../../features/HotPricesSlice';
import { useAppDispatch } from "../../app/hooks";
export const navigationLinks = ['HOME', 'PHONES', 'TABLETS', 'ACCESSORIES'];

export const Header: React.FC = ({}) => {

  const dispatch = useAppDispatch()


  useEffect(() => {
    dispatch(productAction.fetchProduct())
  },[])

  return (
    <header className={style.header}>
      <div className={style.header__container}>
        <div className={style.nav__logo}>
          <a className={style.nav__img} href="">
            <img className={style.nav__logo__img}
              src="https://allaserhiienko.github.io/react_phone-catalog//img/icons/logo.svg" alt="" />
          </a>
        </div>

        <ul className={style.nav}>
          {navigationLinks.map(item => (
            <li
              key={item}
              className={style.nav__item}
            >
              <a
                href=""
                className={style.nav__link}
              >
                {item}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className={style.header__menu}>
        <a className={style.header__menu__img} href=""></a>
      </div>
      <div className={style.header__icon}>
        <div className={style.header__wraper}>
          <a className={`${style.header__favorit} ${style.header__img}`} href=""></a>
        </div>
        <div className={style.header__wraper}>
          <a className={`${style.header__cart} ${style.header__img}`} href=""></a>
        </div>
      </div>
    </header>
  );
};
