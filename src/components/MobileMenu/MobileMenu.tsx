import { NavLink, Link } from 'react-router-dom';
import cn from 'classnames';

import './mobileMenu.scss';

type Props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const getLinkClass = ({ isActive }: { isActive: boolean }) => cn(
  'mobilemenu__link',
  {
    'mobilemenu__link--is-active': isActive,
  },
);

export const MobileMenu: React.FC<Props> = ({ isOpen, setIsOpen }) => {
  return (
    <nav className={`mobilemenu ${isOpen ? 'open' : ''}`}>
      <div className="mobilemenu__header">
        <Link
          to="/"
          className="logo mobilemenu__logo"
        >
          <img
            className="logo__img"
            src="new/img/logo/logo.svg"
            alt="logo"
          />
        </Link>
        <button
          type="submit"
          onClick={() => setIsOpen(false)}
        >
          <img
            src="new/img/icons/close.svg"
            alt="burger-menu"
            className="burgermenu__icon-close"
          />
        </button>
      </div>

      <div className="mobilemenu__links">
        <NavLink
          className={getLinkClass}
          onClick={() => setIsOpen(false)}
          to="/"
        >
          Home
        </NavLink>

        <NavLink
          className={getLinkClass}
          to="/phones"
          onClick={() => setIsOpen(false)}
        >
          Phones
        </NavLink>

        <NavLink
          className={getLinkClass}
          to="/tablets"
          onClick={() => setIsOpen(false)}
        >
          Tablets
        </NavLink>

        <NavLink
          className={getLinkClass}
          to="/accessories"
          onClick={() => setIsOpen(false)}
        >
          Accessories
        </NavLink>

        <NavLink
          className={({ isActive }) => cn('mobilemenu__favorites', {
            'mobilemenu__favorites--is-active': isActive,
          })}
          to="/favorites"
          onClick={() => setIsOpen(false)}
        >
          Favorites
        </NavLink>

        <NavLink
          className={({ isActive }) => cn('mobilemenu__cart', {
            'mobilemenu__cart--is-active': isActive,
          })}
          to="/cart"
          onClick={() => setIsOpen(false)}
        >
          Cart
        </NavLink>
      </div>
    </nav>
  );
};
