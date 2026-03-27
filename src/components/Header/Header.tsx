import Logo from '../../assets/logo.svg';
import Cart from '../../assets/Icons/Cart.svg';
import Favorites from '../../assets/Icons/Favourites.svg';
import BurgerIcon from '../../assets/Icons/Menu.svg';
import Close from '../../assets/Icons/Close.svg';

import './Header.scss';
import { useEffect, useRef, useState } from 'react';
import useOnClickOutside from '../../hooks/useOnClickOutside';
import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';

export const Header: React.FC = () => {
  const BREAKPOINT = 640; // відповідає твоєму @media max-width: 639px
  const [isOpen, setIsOpen] = useState(false);

  const navRef = useRef<HTMLElement | null>(null);
  const burgerRef = useRef<HTMLButtonElement | null>(null);
  const location = useLocation();
  const pathname = location.pathname;

  useOnClickOutside(navRef, target => {
    if (burgerRef.current && burgerRef.current.contains(target as Node)) {
      return;
    }

    setIsOpen(false);
  });

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', onKey);

    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= BREAKPOINT) {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', onResize);

    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <>
      <header className="header">
        <div className="header__logo">
          <img src={Logo} alt="Nice Gadgets" />
        </div>

        <nav className="header__nav">
          <ul className="menu">
            <Link
              to="/"
              className={classNames(
                'menu__item',
                pathname === '/' ? 'active' : '',
              )}
            >
              HOME
            </Link>
            <Link
              to="/phones"
              className={classNames(
                'menu__item',
                pathname.includes('phones') ? 'active' : '',
              )}
            >
              PHONES
            </Link>
            <Link
              to="/tablets"
              className={classNames(
                'menu__item',
                pathname.includes('tablets') ? 'active' : '',
              )}
            >
              TABLETS
            </Link>
            <Link
              to="/accessories"
              className={classNames(
                'menu__item',
                pathname.includes('accessories') ? 'active' : '',
              )}
            >
              ACCESSORIES
            </Link>
          </ul>
        </nav>

        <div className="header__favorites">
          <img src={Favorites} alt="Favorites" />
        </div>

        <div className="header__cart">
          <img src={Cart} alt="Cart" />
        </div>

        <button
          ref={burgerRef}
          className="burger"
          aria-expanded={isOpen}
          onClick={() => setIsOpen(v => !v)}
        >
          <img src={BurgerIcon} alt="Menu" />
        </button>
      </header>

      {/* Мобільне бокове меню */}
      <aside
        ref={navRef}
        className={`mobile-menu ${isOpen ? 'mobile-menu--open' : ''}`}
      >
        <div className="mobile-menu__top">
          <div className="mobile-menu__title">
            <img src={Logo} alt="logo" />
          </div>
          <button
            className="mobile-menu__close"
            onClick={() => setIsOpen(false)}
          >
            <img src={Close} alt="clsoe btn" />
          </button>
        </div>

        <nav className="mobile-menu__nav">
          <ul className="mobile-menu__list">
            <li className="active">HOME</li>
            <li>PHONES</li>
            <li>TABLETS</li>
            <li>ACCESSORIES</li>
          </ul>
        </nav>

        <div className="mobile-menu__bottom">
          <div className="mobile-menu__action">
            <img src={Favorites} alt="Favorites" />
          </div>
          <div className="mobile-menu__action">
            <img src={Cart} alt="Cart" />
          </div>
        </div>
      </aside>

      {isOpen && (
        <div className="mobile-overlay" onClick={() => setIsOpen(false)} />
      )}
    </>
  );
};
