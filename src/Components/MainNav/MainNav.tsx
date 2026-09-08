import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import './MainNav.scss';

type Props = {
  isVertical?: boolean;
};

export const MainNav: React.FC<Props> = ({ isVertical = false }) => {
  const navLinkClass = (props: { isActive: boolean }) =>
    classNames('main-nav__item text-button', {
      'main-nav__item--selected': props.isActive,
    });

  return (
    <nav
      className={classNames('main-nav', {
        'main-nav--vertical': isVertical,
      })}
      aria-label="Main navigation"
    >
      <ul className="main-nav__list">
        <li>
          <NavLink className={navLinkClass} to="/">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink className={navLinkClass} to="/phones">
            Phones
          </NavLink>
        </li>
        <li>
          <NavLink className={navLinkClass} to="/tablets">
            Tablets
          </NavLink>
        </li>
        <li>
          <NavLink className={navLinkClass} to="/accessories">
            Accessories
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
