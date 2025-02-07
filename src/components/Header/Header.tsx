import { Link, NavLink } from 'react-router-dom';
import style from './Header.module.scss';
import { Carousel } from '../Carousel';
import classNames from 'classnames';
import { useState } from 'react';

const getActiveLink = ({ isActive }: { isActive: boolean }) =>
  classNames(`${[style.menu__link]}`, {
    'has-background-grey-lighter': isActive,
  });

export const Header = () => {
  const navLinks = ['home', 'phones', 'tablets', 'accessories'];
  const [showAside, setShowAside] = useState(1);

  return (
    <header className={style.header}>
      <div className={style.header__top}>
        <Link to="./" className={style.logo}>
          <img
            src={'./src/assets/icons/logo-3x.png'}
            alt="logo"
            className={style.logo__img}
          />
        </Link>

        <Link
          to="#"
          className={`${style.icon}`}
          onClick={() => setShowAside(0)}
        >
          <img
            src={'./src/assets/icons/menu-2x.png'}
            alt="logo"
            className={style.icon__img}
          />
        </Link>
      </div>

      <h1 className={style.header__title}>
        Welcome to Nice
        <br />
        Gadgets store!
      </h1>

      <div className={style.header__container}>
        <Carousel />
      </div>

      <aside
        className={style.menu}
        style={{ transform: `translate(-${showAside * 101}%)` }}
      >
        <div className={style.menu__top}>
          <Link to="./" className={style.logo}>
            <img
              src={'./src/assets/icons/logo-3x.png'}
              alt="logo"
              className={style.logo__img}
            />
          </Link>

          <Link
            to="#"
            className={`${style.icon} ${style['icon--close']}`}
            onClick={() => setShowAside(1)}
          >
            <img
              src={'./src/assets/icons/close-2x.png'}
              alt="logo"
              className={style.icon__img}
            />
          </Link>
        </div>
        <div className={style.menu__wrapper}>
          <ul className={style.menu__list}>
            {navLinks.map(link => (
              <li className={style.menu__item} key={link}>
                <NavLink
                  className={getActiveLink}
                  to={link === 'home' ? '/' : link}
                >
                  {link.toUpperCase()}
                </NavLink>
              </li>
            ))}
          </ul>

          <ul className={style.menu__icons}>
            <li className={style.menu__icons__item}>
              <Link to="./" className={style.nav__icons__link}>
                <img
                  src={'./src/assets/icons/heart-2x.png'}
                  alt="heart"
                  className={style.menu__icons__img}
                />
              </Link>
            </li>

            <li className={style.menu__icons__item}>
              <Link to="./" className={style.nav__icons__link}>
                <img
                  src={'./src/assets/icons/shopping_bag-2x.png'}
                  alt="shopping_bag"
                  className={style.menu__icons__img}
                />
              </Link>
            </li>
          </ul>
        </div>
      </aside>
    </header>
  );
};
