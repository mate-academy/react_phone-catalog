import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

interface Props {
  basket: Basket[];
  likes: string[];
}

const NavTemplate: FC<Props> = ({
  basket,
  likes,
}) => {
  return (
    <header className="header">
      <div className="header__navigation-block">
        <div className="header__logo">
          <img src="img/Apple.svg" alt="Apple" />
          <img src="img/Drocher.svg" alt="Drocher" />
        </div>
        <nav className="navigation">
          <ul className="navigation__list">
            <li>
              <NavLink
                to="/"
                exact
                className="navigation__item"
                activeClassName="navigation__item--active"
              >
                Home
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/phones"
                activeClassName="navigation__item--active"
                className="navigation__item"
              >
                Phones
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>

      <div className="navigation__additional">

        <NavLink
          to="/favorites"
          exact
          className="navigation__item navigation__item--like"
          activeClassName="navigation__item--active-additional"
        >
          {likes.length > 0 && (
            <span className="navigation__basket-items">
              {likes.length}
            </span>
          )}
        </NavLink>

        <NavLink
          to="/cart"
          exact
          className="navigation__item navigation__item--cart"
          activeClassName="navigation__item--active-additional"
        >
          {basket.length > 0 && (
            <span className="navigation__basket-items">
              {basket.reduce((total, item) => {
                return total + item.quantity;
              }, 0)}
            </span>
          )}
        </NavLink>
      </div>
    </header>
  );
};

const mapStateToProps = (
  state: {
    basketReducer: BasketState;
    likesReducer: LikesState;
  },
) => ({
  basket: state.basketReducer.basket,
  likes: state.likesReducer.likes,
});

export const Nav = connect(
  mapStateToProps,
)(NavTemplate);
