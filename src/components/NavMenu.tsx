import classNames from 'classnames';
import React from 'react';
import { NavLink } from 'react-router-dom';

type Props = {
  side: string,
  visible: boolean,
  setVisible: (value: boolean) => void,
};

export const NavMenu: React.FC<Props> = ({ side, visible, setVisible }) => {
  return (
    <ul className={classNames(
      `${side}__menu`,
      { 'side__menu--visible': visible },
    )}
    >
      <div className={classNames(`${side}__list`)}>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => classNames(
              `${side}__link`,
              {
                'header__link--active': isActive,
                'side_link--active': isActive,
              },
            )}
            onClick={() => setVisible(false)}
          >
            HOME
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/phones"
            className={({ isActive }) => classNames(
              `${side}__link`,
              {
                'header__link--active': isActive,
                'side_link--active': isActive,
              },
            )}
            onClick={() => setVisible(false)}
          >
            PHONES
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/tablets"
            className={({ isActive }) => classNames(
              `${side}__link`,
              {
                'header__link--active': isActive,
                'side_link--active': isActive,
              },
            )}
            onClick={() => setVisible(false)}
          >
            TABLETS
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/accessories"
            className={({ isActive }) => classNames(
              `${side}__link`,
              {
                'header__link--active': isActive,
                'side__link--active': isActive,
              },
            )}
            onClick={() => setVisible(false)}
          >
            ACCESSORIES
          </NavLink>
        </li>
      </div>
    </ul>
  );
};
