import React from "react";
import {NavLink, useLocation} from "react-router-dom";

import classNames from "classnames";

export const NavBar: React.FC = () => {
  const {pathname} = useLocation();

  return (
    <nav
      className="
    header__nav-bar__menu
    nav-bar
    "
    >
      <ul className="header__nav-bar__list nav-bar__list">
        <li className="header__nav-bar__item">
          <NavLink
            to="/"
            className={classNames(
              "header__nav-bar__link",
              "nav-bar__link",
              "nav-bar__link-custom",
              {
                "is-active": pathname === "/",
              },
            )}
          >
            home
          </NavLink>
        </li>

        <li className="header__nav-bar__item">
          <NavLink
            to="/phones"
            className={classNames("header__nav-bar__link", "nav-bar__link", {
              "is-active-custom": pathname === "/phones",
            })}
          >
            phones
          </NavLink>
        </li>

        <li className="header__nav-bar__item">
          <NavLink
            to="/tablets"
            className={classNames("header__nav-bar__link", "nav-bar__link", {
              "is-active-custom": pathname === "/tablets",
            })}
          >
            tablets
          </NavLink>
        </li>

        <li className="header__nav-bar__item">
          <NavLink
            to="/accessories"
            className={classNames("header__nav-bar__link", "nav-bar__link", {
              "is-active-custom": pathname === "/accessories",
            })}
          >
            accessories
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
