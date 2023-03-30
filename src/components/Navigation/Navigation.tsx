import './navigation.scss';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

import { Path } from '../../type/types';

type Props = {
  isActive: Path | string,
};

export const Navigation: React.FC<Props> = ({ isActive }) => {
  return (
    <nav>
      <ul className="navigation">
        <li className="navigation__item">
          <NavLink
            className={classNames('navigation__link',
              { 'navigation__link--active': isActive.includes(Path.Home) })}
            to="/"
          >
            home
          </NavLink>
        </li>

        <li className="navigation__item">
          <NavLink
            className={classNames('navigation__link',
              { 'navigation__link--active': isActive.includes(Path.Phones) })}
            to="/phones"
          >
            phones
          </NavLink>
        </li>

        <li className="navigation__item">
          <NavLink
            className={classNames('navigation__link',
              { 'navigation__link--active': isActive.includes(Path.Tablets) })}
            to="/tablets"
          >
            tablets
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
            accessories
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
