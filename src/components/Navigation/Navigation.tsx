import './navigation.scss';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

import { Path } from '../../type/types';

type Props = {
  isActive: Path | string,
  setIsActive: (arg: Path | '') => void,
};

export const Navigation: React.FC<Props> = ({ isActive, setIsActive }) => {
  return (
    <nav>
      <ul className="navigation">
        <li className="navigation__item">
          <NavLink
            className={classNames('navigation__link',
              { 'navigation__link--active': isActive === Path.Home })}
            to="/"
            onClick={() => setIsActive(Path.Home)}
          >
            home
          </NavLink>
        </li>

        <li className="navigation__item">
          <NavLink
            className={classNames('navigation__link',
              { 'navigation__link--active': isActive === Path.Phones })}
            to="/phones"
            onClick={() => setIsActive(Path.Phones)}
          >
            phones
          </NavLink>
        </li>

        <li className="navigation__item">
          <NavLink
            className={classNames('navigation__link',
              { 'navigation__link--active': isActive === Path.Tablets })}
            to="/tablets"
            onClick={() => setIsActive(Path.Tablets)}
          >
            tablets
          </NavLink>
        </li>

        <li className="navigation__item">
          <NavLink
            className={classNames('navigation__link',
              { 'navigation__link--active': isActive === Path.Accessories })}
            to="/accessories"
            onClick={() => setIsActive(Path.Accessories)}
          >
            accessories
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
