import React, { useState } from 'react';
import './BurgerMenuStyles.scss';

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
              src="icons/burger.png"
              alt="logo"
              className="burger__logo--image"
            />
          </div>
          {activeBurger && (
            <div className="burger__container">
              <div className="burger__header">
                <div className="burger__header--logo">
                  <img
                    src="./../../../public/img/Icons/Logo.png"
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
                  <img
                    src="./../../../public/img/Icons/favourite.png"
                    alt="favorite"
                  />
                </div>
                <div className="burger__cart">
                  <img
                    src="./../../../public/img/Icons/cart.png.png"
                    alt="cart"
                  />
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
