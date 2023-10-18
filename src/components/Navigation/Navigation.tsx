import './navigation.scss';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

import { Path } from '../../type/types';

type Props = {
  isActive: Path | string,
};

export const Navigation: React.FC<Props> = ({ isActive }) => {
  return (
    <nav className="navigation">
      <ul className="navigation__list">
        <li className="navigation__item">
          <NavLink
            className={classNames('navigation__link',
              { 'navigation__link--active': isActive.includes(Path.Home) })}
            to="/"
          >
            <p className={classNames('navigation__text-link',
              {
                'navigation__text-link--active':
                  isActive.includes(Path.Home),
              })}
            >
              home
            </p>
          </NavLink>
        </li>

        <li className="navigation__item">
          <NavLink
            className={classNames('navigation__link',
              { 'navigation__link--active': isActive.includes(Path.Phones) })}
            to="/phones"
          >
            <p className={classNames('navigation__text-link',
              {
                'navigation__text-link--active':
                  isActive.includes(Path.Phones),
              })}
            >
              phones
            </p>
          </NavLink>
        </li>

        <li className="navigation__item">
          <NavLink
            className={classNames('navigation__link',
              { 'navigation__link--active': isActive.includes(Path.Tablets) })}
            to="/tablets"
          >
            <p className={classNames('navigation__text-link',
              {
                'navigation__text-link--active':
                  isActive.includes(Path.Tablets),
              })}
            >
              tablets
            </p>
          </NavLink>
        </li>

        <li className="navigation__item">
          <NavLink
            className={classNames('navigation__link',
              {
                'navigation__link--active':
                isActive.includes(Path.Accessories),
              })}
            to="/accessories"
          >
            <p className={classNames('navigation__text-link',
              {
                'navigation__text-link--active':
                  isActive.includes(Path.Accessories),
              })}
            >
              accessories
            </p>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
