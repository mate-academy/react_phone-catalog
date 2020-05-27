import React from 'react';
import {
  Route,
  Link,
} from 'react-router-dom';

export const Header = () => (
  <>
    <header className="header">
      <div className="header__container">
        <nav className="header__nav">
          <ul className="list">
            <li className="list__item">
              <Link className="list__link logo" to="/">logo</Link>
            </li>
            <li className="list__item">
              <Link className="list__link" to="/">Home</Link>
            </li>
            <li className="list__item">
              <Link className="list__link" to="/phones">phones</Link>
            </li>
            <li className="list__item">
              <Link className="list__link" to="/tablets">tablets</Link>
            </li>
            <li className="list__item">
              <Link className="list__link" to="/accessories">accessories</Link>
            </li>
          </ul>
          <ul className="list">
            <Link to="/favorite">
              <li className="nav nav__favorite" />
            </Link>
            <Link to="/bag">
              <li className="nav nav__bag" />
            </Link>
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
