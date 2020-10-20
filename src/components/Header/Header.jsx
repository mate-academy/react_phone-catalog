import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbar from '../Navbar/Navbar';

export const Header = () => {
  const liked = useSelector(state => state.liked.items);
  const cart = useSelector(state => state.cart.items);

  return (
    <header className="header">
      <nav className="nav header__nav">
        <div className="logo nav__logo"></div>
        <Navbar/>
      </nav>

      <NavLink to="/favorites">
        <button className="icon-container header__icon-container header__icon-container-favorites">
          <span href="#favorites" className="icon-container__icon icon-container__icon_favorites">
            {liked.length > 0 &&
              <span className="icon-container__circle">{liked.length}</span>
            }
          </span>
        </button>
      </NavLink>

      <NavLink to="cart">
        <button className="icon-container header__icon-container">
          <span className="icon-container__icon icon-container__icon_shopping-cart">
          {cart.length > 0 &&
              <span className="icon-container__circle">{cart.length}</span>
            }
          </span>
        </button>
      </NavLink>
    </header>
  )
}