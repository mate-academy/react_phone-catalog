import Logo from '../../assets/logo.svg';
import Cart from '../../assets/Icons/Cart.svg';
import Favorites from '../../assets/Icons/Favourites.svg';
import BurgerIcon from '../../assets/Icons/Menu.svg';
import Close from '../../assets/Icons/Close.svg';

import './Header.scss';
import { useEffect, useRef, useState } from 'react';
import useOnClickOutside from '../../hooks/useOnClickOutside';

export const Header: React.FC = () => {
  const BREAKPOINT = 640; // відповідає твоєму @media max-width: 639px
  const [isOpen, setIsOpen] = useState(false);

  const navRef = useRef<HTMLElement | null>(null);
  const burgerRef = useRef<HTMLButtonElement | null>(null);

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
            <li className="active menu__item">HOME</li>
            <li className="menu__item">PHONES</li>
            <li className="menu__item">TABLETS</li>
            <li className="menu__item">ACCESSORIES</li>
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
