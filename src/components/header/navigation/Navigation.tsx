import React from 'react';
import { NavLink, Route, Switch } from 'react-router-dom';
import { Search } from '../../search/Search';

const Navigation = () => {
  const navList = ['home', 'phones', 'tablets', 'accessories'];

  return (
    <>
      <nav className="Nav__wrapper">
        <ul className="Nav__list">
          <li>
            <NavLink
              to="/"
              exact
              className="Logo"
            />
          </li>
          {navList.map((listItem) => (
            <li>
              <NavLink
                to={`${listItem}`}
                exact
                className="Nav__item link"
                activeClassName="Nav__item--active"
                key={listItem}
              >
                {listItem}
              </NavLink>
            </li>
          ))}

        </ul>
        <Switch>
        <Route path="/phones"  component={Search} />
        <Route path="/tablets"  component={Search} />
        </Switch>

      </nav>

    </>
  );
};

export default Navigation;
