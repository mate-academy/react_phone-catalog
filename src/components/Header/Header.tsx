import { Link } from 'react-router-dom';
import './header.scss';
import { HeaderNavigation } from './HeaderNavigation';
import { BurgerNavigator } from './BurgerNavigator';
import { useState } from 'react';

export const Header = () => {
  const [isBurgerMenu, setIsburgerMenu] = useState(false);

  return (
    <>
      <div className="header">
        <div className="header__container">
          <div className="header__logo">
            <Link
              to="/"
              className="header__link"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setIsburgerMenu(false);
              }}
            >
              <img
                className="logo top-logo"
                src="/public/img/icons/logo.svg"
                alt="Logo Nice Gadgets"
              />
            </Link>
          </div>

          <HeaderNavigation />

          <div
            className="burger__menu"
            onClick={() => {
              setIsburgerMenu(prev => !prev);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <img
              className="icon"
              src={
                isBurgerMenu
                  ? '/img/icons/Menu-close_icon.svg'
                  : '/img/icons/Burger-menu_icon.svg'
              }
              alt="Menu icon"
            />
          </div>
        </div>
      </div>
      <BurgerNavigator
        isBurgerMenu={isBurgerMenu}
        onClose={() => setIsburgerMenu(false)}
      />
    </>
  );
};
