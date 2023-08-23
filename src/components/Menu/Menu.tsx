import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

import { IsMenuActiveContext } from '../../contexts/IsMenuActiveContext';
import {
  HandleIsMenuActiveContext,
} from '../../contexts/HandleIsMenuActiveContext';

const returnClass = ({ isActive }: { isActive: boolean }) => classNames(
  'menu__nav-link',
  { 'menu__nav-link--active': isActive },
);

export const Menu = () => {
  const isActive = useContext(IsMenuActiveContext);
  const setIsActive = useContext(HandleIsMenuActiveContext);

  const handleState = () => {
    setIsActive(!isActive);
  };

  return (
    <div className="menu">
      <button
        className={classNames(
          'menu__icon',
          { 'menu__icon--active': isActive },
        )}
        type="button"
        aria-label="Menu"
        onClick={handleState}
      />

      <ul
        className={classNames(
          'menu__nav-list',
          { 'menu__nav-list--active': isActive },
        )}
      >
        <li className="menu__nav-item">
          <NavLink
            to="/"
            className={returnClass}
            onClick={handleState}
          >
            home
          </NavLink>
        </li>

        <li className="menu__nav-item">
          <NavLink
            to="/phones"
            className={returnClass}
            onClick={handleState}
          >
            phones
          </NavLink>
        </li>

        <li className="menu__nav-item">
          <NavLink
            to="/tablets"
            className={returnClass}
            onClick={handleState}
          >
            tablets
          </NavLink>
        </li>

        <li className="menu__nav-item">
          <NavLink
            to="/accessories"
            className={returnClass}
            onClick={handleState}
          >
            accessories
          </NavLink>
        </li>

        <li className="menu__nav-item menu__nav-item--phone">
          <NavLink
            to="/favourites"
            className={returnClass}
            onClick={handleState}
          >
            favourites
          </NavLink>
        </li>

        <li className="menu__nav-item menu__nav-item--phone">
          <NavLink
            to="/cart"
            className={returnClass}
            onClick={handleState}
          >
            cart
          </NavLink>
        </li>
      </ul>
    </div>
  );
};
