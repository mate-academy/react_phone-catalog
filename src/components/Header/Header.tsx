import React from 'react';
import {
  Route,
  NavLink,
} from 'react-router-dom';

export const Header = () => (
  <>
    <header className="header">
      <div className="header__container">
        <nav className="header__nav">
          <ul className="list">
            <li className="list__item">
              <NavLink className="list__link logo" to="/">
                <img className="logo__img" src="./img/LOGO.svg" alt="company logo" />
              </NavLink>
            </li>
            <li className="list__item">
              <NavLink className="list__link" to="/">Home</NavLink>
            </li>
            <li className="list__item">
              <NavLink className="list__link" to="/phones">phones</NavLink>
            </li>
            <li className="list__item">
              <NavLink className="list__link" to="/tablets">tablets</NavLink>
            </li>
            <li className="list__item">
              <NavLink className="list__link" to="/accessories">accessories</NavLink>
            </li>
          </ul>
          <ul className="list">
            <NavLink to="/favorite">
              <li className="nav nav__favorite" />
            </NavLink>
            <NavLink to="/bag">
              <li className="nav nav__bag" />
            </NavLink>
          </ul>
        </nav>
      </div>
    </header>

    <Route path="/phones">
      <Phones />
    </Route>
    <Route path="/tablets">
      <Tablets />
    </Route>
    <Route exact path="/">
      <Home />
    </Route>
  </>
);

const Phones = () => (
  <>
    <h1>
      Phones
    </h1>
  </>
);

const Tablets = () => (
  <>
    <h1>
      Tablets
    </h1>
  </>
);

const Home = () => (
  <>
    <h1>
      Home
    </h1>
  </>
);
