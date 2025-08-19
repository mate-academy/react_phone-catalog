import React, { useEffect, useState } from 'react';
import header from './Header.module.scss';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  return (
    <>
      <header className={header.header}>
        <div className={header['header__top-bar']}>
          <a href="/" className={header.header__link__logo}>
            <img
              src="/img/icons/logo.png"
              alt="Nice Gadgets logo"
              className={header.header__icon__logo}
            />
          </a>
          {isMenuOpen ? (
            <button
              className={header.header__link__burger}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <img
                src="/img/icons/close.svg"
                alt="Nice Gadgets logo"
                className={header.header__icon}
              />
            </button>
          ) : (
            <button
              className={header.header__link__burger}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <img
                src="/img/icons/burger-icon.svg"
                alt="Nice Gadgets logo"
                className={header.header__icon}
              />
            </button>
          )}
        </div>
      </header>
      <aside
        className={`${header.header__menu} ${header.menu} ${isMenuOpen ? header['header__menu--open'] : ''}`}
      >
        <nav className={header.menu__nav}>
          <ul className={header.menu__nav__list}>
            <li className={header.menu__nav__item}>
              <a href="/" className={header.menu__nav__link}>
                home
              </a>
            </li>
            <li className={header.menu__nav__item}>
              <a href="/phones" className={header.menu__nav__link}>
                Phones
              </a>
            </li>
            <li className={header.menu__nav__item}>
              <a href="/tablets" className={header.menu__nav__link}>
                tablets
              </a>
            </li>
            <li className={header.menu__nav__item}>
              <a href="/accessories" className={header.menu__nav__link}>
                accessories
              </a>
            </li>
          </ul>
        </nav>
        <div className={header.menu__icons}>
          <ul className={header.menu__icons__list}>
            <li
              className={`${header.menu__icons__item} ${header['menu__icons__item--border-right']}`}
            >
              <a href="/favourites" className={header.menu__icons__link}>
                <img
                  src="/img/icons/heart-like.svg"
                  alt="Heart icon"
                  className={header.menu__icons__icon}
                />
              </a>
            </li>
            <li className={header.menu__icons__item}>
              <a href="/cart" className={header.menu__icons__link}>
                <img
                  src="/img/icons/shopping-bag.svg"
                  alt="Shopping Bag icon"
                  className={header.menu__icons__icon}
                />
              </a>
            </li>
          </ul>
        </div>
      </aside>

      <header className={`${header.header} ${header['header--big-screen']}`}>
        <div
          className={`${header['header__top-bar']} ${header['header__top-bar--big-screen']}`}
        >
          <div className={header.menu__nav__container}>
            <a href="/" className={header.header__link__logo}>
              <img
                src="/img/icons/logo.png"
                alt="Nice Gadgets logo"
                className={header.header__icon__logo}
              />
            </a>
            <nav
              className={`${header.menu__nav} ${header['menu__nav--big-screen']}`}
            >
              <ul
                className={`${header.menu__nav__list} ${header['header.menu__nav__list--big-screen']}`}
              >
                <li className={header.menu__nav__item}>
                  <a href="/" className={header.menu__nav__link}>
                    home
                  </a>
                </li>
                <li className={header.menu__nav__item}>
                  <a href="/phones" className={header.menu__nav__link}>
                    Phones
                  </a>
                </li>
                <li className={header.menu__nav__item}>
                  <a href="/tablets" className={header.menu__nav__link}>
                    tablets
                  </a>
                </li>
                <li className={header.menu__nav__item}>
                  <a href="/accessories" className={header.menu__nav__link}>
                    accessories
                  </a>
                </li>
              </ul>
            </nav>
          </div>
          <div
            className={`${header.menu__icons} ${header['menu__icons--big-screen']}`}
          >
            <ul
              className={`${header.menu__icons__list} ${header['menu__icons__list--big-screen']}`}
            >
              <li
                className={`${header.menu__icons__item} ${header['menu__icons__item--big-screen']}`}
              >
                <a href="/favourites" className={header.menu__icons__link}>
                  <img
                    src="/img/icons/heart-like.svg"
                    alt="Heart icon"
                    className={header.menu__icons__icon}
                  />
                </a>
              </li>
              <li
                className={`${header.menu__icons__item} ${header['menu__icons__item--big-screen']}`}
              >
                <a href="/cart" className={header.menu__icons__link}>
                  <img
                    src="/img/icons/shopping-bag.svg"
                    alt="Shopping Bag icon"
                    className={header.menu__icons__icon}
                  />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </header>
    </>
  );
};
