import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

import './Menu.scss';
import Close from '../../Images/Icons/Close.svg';

function getActiveClass({ isActive }: { isActive: boolean }) {
  return classNames('menu__page-link', {
    'menu__page-link--active': isActive,
  });
}

type Props = {
  onOpen: (bool :boolean) => void
};

export const Menu: React.FC<Props> = ({ onOpen }) => {
  const handleMenuClose = () => {
    onOpen(false);
  };

  return (
    <div className="menu">
      <div className="menu__top">
        <NavLink
          to="/"
          className="menu__logo"
          onClick={handleMenuClose}
        />

        <div
          className="menu__close"
          onClick={handleMenuClose}
          aria-hidden="true"
        >
          <img src={Close} alt="cross" />
        </div>
      </div>

      <nav
        className="menu__nav"
        aria-label="menu-navigation"
      >
        <NavLink
          to="/"
          className={getActiveClass}
          onClick={handleMenuClose}
        >
          Home
        </NavLink>

        <NavLink
          to="/phones"
          className={getActiveClass}
          onClick={handleMenuClose}
        >
          Phones
        </NavLink>

        <NavLink
          to="/tablets"
          className={getActiveClass}
          onClick={handleMenuClose}
        >
          Tablets
        </NavLink>

        <NavLink
          to="/accessories"
          className={getActiveClass}
          onClick={handleMenuClose}
        >
          Accessories
        </NavLink>
      </nav>
    </div>
  );
};
