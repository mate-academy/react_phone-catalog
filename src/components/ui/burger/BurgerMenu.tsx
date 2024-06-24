import React, { useState } from 'react';
import './BurgerMenuStyles.scss';
import { PageType } from 'src/types/PageType';
import { Link } from 'react-router-dom';
import Cart from '../ActiveIcons/Cart/Cart';
import Favourite from '../ActiveIcons/Favourite/Favourite';

const BurgerMenu = () => {
  const [activeBurger, setActiveBurger] = useState(false);

  const handleClick = (arg: boolean) => {
    setActiveBurger(arg);
  };

  const handlecloseMenu = () => {
    setActiveBurger(false);
  };

  return (
    <>
      <nav className="burger">
        <div className="burger__wrapper">
          <div className="burger__logo" onClick={() => handleClick(true)}>
            <img
              src="icons/burger.png"
              alt="logo"
              className="burger__logo--image"
            />
          </div>
          {activeBurger && (
            <div className="burger__container active--burger">
              <div className="burger__header">
                <div className="burger__header--logo">
                  <img
                    src="icons/Logo.png"
                    alt="logo"
                    className="burger__header--logo-img"
                  />
                </div>
                <div
                  className="burger__header--close close"
                  onClick={() => handleClick(false)}
                >
                  <div className="close__wrapper">
                    <span className="close__top"></span>
                    <span className="close__bottom"></span>
                  </div>
                </div>
              </div>
              <nav className="burger__nav-wrapper">
                <ul className="burger__nav-List menu--text">
                  <li className="burger__nav-List--Item">
                    <Link to="/" onClick={() => handlecloseMenu()}>
                      HOME
                    </Link>
                  </li>
                  <li className="burger__nav-List--Item">
                    <Link
                      to={PageType.Accessories}
                      onClick={() => handlecloseMenu()}
                    >
                      PHONES
                    </Link>
                  </li>
                  <li className="burger__nav-List--Item">
                    <Link
                      to={PageType.Tablets}
                      onClick={() => handlecloseMenu()}
                    >
                      TABLETS
                    </Link>
                  </li>
                  <li className="burger__nav-List--Item">
                    <Link
                      to={PageType.Accessories}
                      onClick={() => handlecloseMenu()}
                    >
                      ACCESSORIES
                    </Link>
                  </li>
                </ul>
              </nav>
              <div className="burger__footer">
                <Link
                  className="burger__favourite"
                  to="favourites"
                  onClick={() => handlecloseMenu()}
                >
                  <Favourite />
                </Link>
                <Link
                  className="burger__cart"
                  to="cart"
                  onClick={() => handlecloseMenu()}
                >
                  <Cart />
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default BurgerMenu;
