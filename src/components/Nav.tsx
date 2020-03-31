import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { Basket } from './Basket';
import * as actions from '../redux/actions';

interface Props {
  isOpenedBasket: boolean;
  basket: Basket[];
  setisOpenedBasket: () => void;
}

const NavTemplate: FC<Props> = ({
  isOpenedBasket,
  setisOpenedBasket,
  basket,
}) => {
  const handleBasket = () => {
    setisOpenedBasket();
  };

  return (
    <header className="header">
      <div className="header__navigation-block">
        <div className="header__logo">
          <img src="img/Apple.png" alt="Apple" />
          <img src="img/Drocher.png" alt="Drocher" />
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

      <div>
        <button
          type="button"
          className="settings__basket"
          onClick={handleBasket}
        >
          {basket.length > 0 && (
            <span className="navigation__basket-items">
              {basket.reduce((total, item) => {
                return total + item.quantity;
              }, 0)}
            </span>
          )}
        </button>
        {isOpenedBasket && (
          <Basket />
        )}
      </div>
    </header>
  );
};

const mapStateToProps = (
  state: {
    basketButtonReducer: BasketButtonState;
    basketReducer: BasketState;
  },
) => ({
  isOpenedBasket: state.basketButtonReducer.isOpened,
  basket: state.basketReducer.basket,
});

const mapDispatchToProps = {
  setisOpenedBasket: actions.setisOpenedBasket,
};

export const Nav = connect(
  mapStateToProps,
  mapDispatchToProps,
)(NavTemplate);
