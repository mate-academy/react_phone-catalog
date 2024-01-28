import { Link, NavLink } from 'react-router-dom';

import './MenuNavForPhone.scss';

interface Props {
  transformMobileMenu: number;
  setTransformMobileMenu: React.Dispatch<React.SetStateAction<number>>;
}

export const MenuNavForPhone: React.FC<Props> = ({
  transformMobileMenu,
  setTransformMobileMenu,
}) => {
  const handleCloseMenu = () => {
    setTransformMobileMenu(-100);
    document.body.style.overflow = 'unset';
  };

  return (
    <div
      style={
        {
          transform: `translateX(${transformMobileMenu}%)`,
        }
      }
      className="burger-menu"
    >
      <div className="burger-menu__header">
        <NavLink
          to="/"
          className="burger-menu__logo"
          onClick={handleCloseMenu}
        >
          <span className="logo" />
        </NavLink>
        <button
          type="button"
          className="burger-menu__close"
          onClick={handleCloseMenu}
        >
          <span className="icon icon-close" />
        </button>
      </div>
      <div className="burger-menu__nav">
        <NavLink
          to="/"
          className="burger-menu__link"
          onClick={handleCloseMenu}
        >
          Home
        </NavLink>
        <NavLink
          to="phones"
          className="burger-menu__link"
          onClick={handleCloseMenu}
        >
          Phones
        </NavLink>
        <NavLink
          to="tablets"
          className="burger-menu__link"
          onClick={handleCloseMenu}
        >
          Tablets
        </NavLink>
        <NavLink
          to="accessories"
          className="burger-menu__link"
          onClick={handleCloseMenu}
        >
          Accessories
        </NavLink>
        <NavLink
          to="favourites"
          className="burger-menu__link"
          onClick={handleCloseMenu}
        >
          Favourites
        </NavLink>
        <NavLink
          to="cart"
          className="burger-menu__link"
          onClick={handleCloseMenu}
        >
          Cart
        </NavLink>
        <Link
          to="https://github.com/Ukrainiane-panda"
          className="burger-menu__link"
          onClick={handleCloseMenu}
        >
          Contacts
        </Link>
      </div>
    </div>
  );
};
