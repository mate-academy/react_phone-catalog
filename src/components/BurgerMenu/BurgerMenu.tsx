import * as R from 'react';
import { NavLink, Link } from 'react-router-dom';
import cn from 'classnames';

import './BurgerMenu.scss';

const getLinkClass = ({ isActive }: { isActive: boolean }) => {
  return cn('AsideMenu__link', {
    isActive,
  });
};

export const BurgerMenu = () => {
  const [isOpen, setIsOpen] = R.useState(false);
  const asideOpen = () => setIsOpen(true);
  const asideClose = () => setIsOpen(false);

  return (
    <aside>
      <div className="BurgerMenu">
        <button
          type="button"
          onClick={asideOpen}
          className="BurgerMenu__button"
          disabled={isOpen}
          aria-label="openMenu"
        >
          <i className="BurgerMenu__icon icon--menu" />
        </button>
      </div>

      <nav className={cn('AsideMenu', {
        isOpen,
      })}
      >
        <div className="AsideMenu__header">
          <Link
            to="/"
            className="AsideMenu__logo icon--logo"
          />

          <button
            type="button"
            onClick={asideClose}
            className="BurgerMenu__button"
            aria-label="closeMenu"
          >
            <i className="BurgerMenu__icon icon--close" />
          </button>
        </div>

        <div className="AsideMenu__links">
          <NavLink
            className={getLinkClass}
            onClick={asideClose}
            to="/"
          >
            Home
          </NavLink>

          <NavLink
            className={getLinkClass}
            to="/phones"
            onClick={asideClose}
          >
            Phones
          </NavLink>

          <NavLink
            className={getLinkClass}
            to="/tablets"
            onClick={asideClose}
          >
            Tablets
          </NavLink>

          <NavLink
            className={getLinkClass}
            to="/accessories"
            onClick={asideClose}
          >
            Accessories
          </NavLink>

          <NavLink
            className={getLinkClass}
            to="/favorites"
            onClick={asideClose}
          >
            Favorites
          </NavLink>

          <NavLink
            className={getLinkClass}
            to="/cart"
            onClick={asideClose}
          >
            Cart
          </NavLink>
        </div>
      </nav>
    </aside>
  );
};
