import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getBasket } from '../store/index';

export const Navigation: React.FC = () => {
  const numberInTheBasket = useSelector(getBasket).length;

  return (
    <>
      <nav className="nav">
        <ul className="nav__list">
          <li className="nav__item">
            <NavLink className="fontMonte nav__link" to="/" exact>
              <img src="img/images/logo-nav.png" alt="logo" />
            </NavLink>
          </li>
          <li className="nav__item"><NavLink className="fontMonte nav__link" to="/" exact>home</NavLink></li>
          <li className="nav__item"><NavLink className="fontMonte nav__link" to="/phones/">phones</NavLink></li>
          <li className="nav__item"><NavLink className="fontMonte nav__link" to="/tablets/">tablets</NavLink></li>
          <li className="nav__item"><NavLink className="fontMonte nav__link" to="/accessories/">accessories</NavLink></li>
        </ul>
        <span>
          <NavLink className="fontMonte nav__special-link" to="/favorite/" exact>
            <img src="img/images/favorite.svg" alt="favorite" />
          </NavLink>
          <NavLink className="fontMonte nav__special-link" to="/basket/" exact>
            <img src="img/images/basket.png" alt="basket" />
            <span className="red">
              {numberInTheBasket !== 0 && `  ${numberInTheBasket}`}
            </span>
          </NavLink>
        </span>
      </nav>
    </>
  );
};
