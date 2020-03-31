import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { Basket } from './Basket';
import * as actions from '../redux/actions';

interface Props {
  isOpenedBasket: boolean;
  setisOpenedBasket: () => void;
}

const NavTemplate: FC<Props> = ({ isOpenedBasket, setisOpenedBasket }) => {
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
        />
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
  },
) => ({
  isOpenedBasket: state.basketButtonReducer.isOpened,
});

const mapDispatchToProps = {
  setisOpenedBasket: actions.setisOpenedBasket,
};

export const Nav = connect(
  mapStateToProps,
  mapDispatchToProps,
)(NavTemplate);
