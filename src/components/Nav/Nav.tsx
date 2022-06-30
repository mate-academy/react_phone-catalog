import { NavLink, useLocation } from 'react-router-dom';
import classNames from 'classnames';

import './Nav.scss';

export const Nav = () => {
  const location = useLocation();
  const names = ['home', 'phones', 'tablets', 'accessories'];

  return (
    <ul className="Nav">
      {names.map((name) => {
        return (
          <li className="Nav__item" key={name}>
            <NavLink
              to={name === 'home' ? '/' : `/${name}`}
              className={
                classNames(
                  'Nav__link',
                  { 'Nav__link--active': location.pathname.includes(`/${name}`) },
                  {
                    'Nav__link--active':
                    location.pathname === '/'
                    && name === 'home',
                  },
                )
              }
            >
              {name}
            </NavLink>
          </li>
        );
      })}
    </ul>
  );
};
