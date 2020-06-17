import React from 'react';
import { useLocation, NavLink } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import './BreadCrumbs.scss';

type Location = {
  pathname: string;
};

const BreadCrumbs = () => {
  const location: Location = useLocation();
  const pattern = new RegExp('[^/][\\w-]*', 'g');
  const { pathname } = location;
  const crumbs = pathname.match(pattern) || ['This is homePage'];

  return (
    <ul className="breadCrumbs__list">
      <li className="breadCrumbs__item">
        <NavLink
          to="/"
          exact
          className="breadCrumbs__link"
        >
          <img
            src="./img/icons/BreadCrumbs/Home.svg"
            alt="home"
            className="breadCrumbs__home"
          />
        </NavLink>
        <img
          src="./img/icons/BreadCrumbs/arrow-right.svg"
          alt="arrow"
          className="breadCrumbs__arrow"
        />
      </li>
      {crumbs.map(crumb => {
        if (crumbs[crumbs.length - 1] !== crumb) {
          return (
            <li
              key={uuidv4()}
              className="breadCrumbs__item"
            >
              <NavLink
                to={`/${crumb}`}
                exact
                className="breadCrumbs__link"
              >
                {crumb}
              </NavLink>
              <img
                src="./img/icons/BreadCrumbs/arrow-right.svg"
                alt="arrow"
                className="breadCrumbs__arrow"
              />
            </li>
          );
        }

        return (
          <li
            key={uuidv4()}
            className="breadCrumbs__item breadCrumbs__item--last"
          >
            {crumbs[crumbs.length - 1]}
          </li>
        );
      })}
    </ul>
  );
};

export default BreadCrumbs;
