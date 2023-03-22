/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import classNames from 'classnames';
import { Dispatch, SetStateAction } from 'react';
import { PageNavLink } from '../Navigation';
import './Menu.scss';

type PropTypes = {
  menuActive: boolean;
  setMenuActive: Dispatch<SetStateAction<boolean>>
};

export const Menu: React.FC<PropTypes> = ({ menuActive, setMenuActive }) => {
  return (
    <nav
      className={classNames(
        'menu',
        {
          'menu--active': menuActive,
        },
      )}
      onClick={() => setMenuActive(false)}
    >
      <div className="menu__blur">
        <ul
          className="menu__list"
          onClick={e => e.stopPropagation()}
        >
          <li className="menu__item">
            <PageNavLink to="/" text="Home" />
          </li>
          <li className="menu__item">
            <PageNavLink to="/phones" text="Phones" />
          </li>
          <li className="menu__item">
            <PageNavLink to="/tablets" text="Tablets" />
          </li>
          <li className="menu__item">
            <PageNavLink to="/accessories" text="Accessories" />
          </li>
        </ul>
      </div>
    </nav>
  );
};
