import React, { useState } from 'react';
import './BurgerMenuStyles.scss';
import burger from './../../img/Icons/burger.png';
import logo from './../../img/Icons/Logo.png';
import cart from './../../img/Icons/Cart.png';
import favourite from './../../img/Icons/favourite.png';

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
            <img src={burger} alt="logo" className="burger__logo--image" />
          </div>
          {activeBurger && (
            <div className="burger__container">
              <div className="burger__header">
                <div className="burger__header--logo">
                  <img
                    src={logo}
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
                    <a href="#home">Home</a>
                  </li>
                  <li className="burger__nav-List--Item">
                    <a href="#about-us">Phones</a>
                  </li>
                  <li className="burger__nav-List--Item">
                    <a href="#compare-bikes">tablets</a>
                  </li>
                  <li className="burger__nav-List--Item">
                    <a href="#details">accessories</a>
                  </li>
                </ul>
              </nav>
              <div className="burger__footer">
                <div className="burger__favourite">
                  <img src={favourite} alt="favorite" />
                </div>
                <div className="burger__cart">
                  <img src={cart} alt="cart" />
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
