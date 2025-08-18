import './header.scss';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import { BurgerNavigation } from '../BurgerNavigation';
import { HeaderNavigation } from '../HeaderNavigation';
// import { useCurrentPath } from '../contexts/PathContext';

export const Header = () => {
  const [isBurgerMenu, setIsBurgerMenu] = useState(false);

  // const currentPath = useCurrentPath();

  return (
    <>
      <div className="header">
        <div className="header__container">
          <div className="header__logo">
            <Link to="/" className="header__link">
              <img
                src="/img/logo/logo.svg"
                alt="Company logo"
                className="logo top-logo"
              />
            </Link>
          </div>

          <HeaderNavigation />

          <div
            className="burger__menu"
            onClick={() => setIsBurgerMenu(prev => !prev)}
          >
            <img
              src={
                isBurgerMenu ? '/img/icons/Close.svg' : '/img/icons/Menu.svg'
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
