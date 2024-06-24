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

  return (
    <>
      <nav className="burger">
        <div className="burger__wrapper">
          <div className="burger__logo" onClick={() => handleClick(true)}>
            <img
              src="/icons/burger.png"
              alt="logo"
              className="burger__logo--image"
            />
          </div>
          {activeBurger && (
            <div className="burger__container">
              <div className="burger__header">
                <div className="burger__header--logo">
                  <img
                    src="/img/Icons/Logo.png"
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
                    <Link to="/">HOME</Link>
                  </li>
                  <li className="burger__nav-List--Item">
                    <Link to={PageType.Accessories}>PHONES</Link>
                  </li>
                  <li className="burger__nav-List--Item">
                    <Link to={PageType.Tablets}>TABLETS</Link>
                  </li>
                  <li className="burger__nav-List--Item">
                    <Link to={PageType.Accessories}>ACCESSORIES</Link>
                  </li>
                </ul>
              </nav>
              <div className="burger__footer">
                <div className="burger__favourite">
                  <Favourite />
                </div>
                <div className="burger__cart">
                  <Cart />
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default BurgerMenu;
