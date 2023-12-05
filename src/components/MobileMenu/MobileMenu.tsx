import { NavLink, Link } from 'react-router-dom';
import './MobileMenu.scss';
import React from 'react';

type Props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const getLinkClass = ({ isActive }: { isActive: boolean }) => `mobilemenu__link
${isActive
    ? 'mobilemenu__link--is-active'
    : ''}`;

export const MobileMenu: React.FC<Props> = ({ isOpen, setIsOpen }) => {
  return (
    <nav className={`mobilemenu ${isOpen ? 'open' : ''}`}>
      <div className="mobilemenu__header">
        <Link
          to="/"
          className="logo mobilemenu_logo"
        />

        <button
          type="submit"
          onClick={() => setIsOpen(false)}
          className="burgermenu_icon-close"
          aria-label="closemenuu"
        />
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
          className={`mobilemenu__favorites ${getLinkClass({ isActive: false })}`}
          to="/favorites"
          onClick={() => setIsOpen(false)}
        >
          Favorites
        </NavLink>

        <NavLink
          className={`mobilemenu__cart ${getLinkClass({ isActive: false })}`}
          to="/cart"
          onClick={() => setIsOpen(false)}
        >
          Cart
        </NavLink>
      </div>
    </nav>
  );
};
