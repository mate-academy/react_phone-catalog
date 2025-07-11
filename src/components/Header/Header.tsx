import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BurgerNavigation } from '../BurgerNavigation/BurgerNavigation';

export const Header = () => {
  const [isBurgerMenu, setIsBurgerMenu] = useState(false);

  // useEffect(() => {}, [isBurgerMenu]);

  return (
    <div className="header">
      <div className="header__container">
        <div className="header__logo">
          <a href="#" className="header__link">
            <img
              src="/img/logo/logo.svg"
              alt="Nice gadgets logo"
              className="logo top-logo"
            />
          </a>
        </div>

        <div
          className="header__menu"
          onClick={() => setIsBurgerMenu(prev => !prev)}
        >
          <img
            src={isBurgerMenu ? '/img/icons/Close.svg' : '/img/icons/Menu.svg'}
            alt="menu icon"
            className="icon"
          />
        </div>
      </div>

      <BurgerNavigation isBurgerMenu={ isBurgerMenu } />
    </div>
  );
};
