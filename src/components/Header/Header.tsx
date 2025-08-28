import './header.scss';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import { BurgerNavigation } from '../BurgerNavigation';
import { HeaderNavigation } from '../HeaderNavigation';

export const Header = () => {
  const [isBurgerMenu, setIsBurgerMenu] = useState(false);

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
              }}
            >
              <img
                src="img/logo/logo.svg"
                alt="Company logo"
                className="logo top-logo"
              />
            </Link>
          </div>

          <HeaderNavigation />

          <div
            className="burger__menu"
            onClick={() => {
              setIsBurgerMenu(prev => !prev);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <img
              src={
                isBurgerMenu ? 'img/icons/Close.svg' : 'img/icons/Menu.svg'
              }
              alt="menu icon"
              className="icon"
            />
          </div>
        </div>
      </div>

      <BurgerNavigation
        isBurgerMenu={isBurgerMenu}
        onClose={() => setIsBurgerMenu(false)}
      />
    </>
  );
};
