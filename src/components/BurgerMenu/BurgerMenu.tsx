import { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { TechProductsContext } from '../../stores/TechProductsContext';
import { totalCountInCart } from '../../helpers/getTotalCount';
import './BurgerMenu.scss';

type Props = {
  transformMobileMenu: number,
  setTransformMobileMenu: (transform: number) => void,
};

export const BurgerMenu: React.FC<Props> = ({
  transformMobileMenu,
  setTransformMobileMenu,
}) => {
  const {
    favouritesProducts,
    cart,
  } = useContext(TechProductsContext);

  const getMobileLinkClass = ({ isActive }:{ isActive: boolean }) => {
    return classNames(
      'burger-header-menu__menu-link',
      { 'burger-header-menu__menu-link--is-active': isActive },
    );
  };

  const getIconLinkClass = ({ isActive }:{ isActive: boolean }) => {
    return classNames(
      'burger-header-menu__mobile-icon-link',
      { 'burger-header-menu__mobile-icon-link--is-active': isActive },
    );
  };

  const handleCloseMenu = () => {
    setTransformMobileMenu(-100);
    document.body.style.overflow = 'unset';
  };

  return (
    <nav
      style={
        {
          transform: `translateX(${transformMobileMenu}%)`,
        }
      }
      className="burger-header-menu App__menu"
      id="menu"
    >
      <div className="burger-header-menu__top">
        <Link
          to="/"
          className="logo Header__logo"
          onClick={handleCloseMenu}
        >
          <img
            src="img/logo/Logo.svg"
            alt="Logo"
            className="logo__image"
          />
        </Link>

        <div
          className="burger-header-menu__mobile-icon-wrapper"
        >
          <NavLink
            className={getIconLinkClass}
            to="/favourites"
            onClick={handleCloseMenu}
          >
            <div className="icon icon--favourite-in-header" />
          </NavLink>

          {
            !!favouritesProducts.length && (
              <div className="burger-header-menu__count-icon">
                {favouritesProducts.length}
              </div>
            )
          }
        </div>

        <div
          className="burger-header-menu__mobile-icon-wrapper"
        >
          <NavLink
            className={getIconLinkClass}
            to="/cart"
            onClick={handleCloseMenu}
          >
            <div className="icon icon--cart" />
          </NavLink>

          {
            !!cart.length && (
              <div className="burger-header-menu__count-icon">
                {totalCountInCart(cart)}
              </div>
            )
          }
        </div>

        <div
          className="burger-header-menu__mobile-icon-wrapper"
        >
          <button
            type="button"
            className="burger-header-menu__mobile-icon-link"
            onClick={handleCloseMenu}
          >
            <div className="icon icon--cross" />
          </button>
        </div>
      </div>

      <div className="burger-header-menu__content">
        <ul className="burger-header-menu__menu-list">
          <li className="burger-header-menu__menu-item">
            <NavLink
              to="/"
              className={getMobileLinkClass}
              onClick={handleCloseMenu}
            >
              Home
            </NavLink>
          </li>

          <li className="burger-header-menu__menu-item">
            <NavLink
              to="/phones"
              className={getMobileLinkClass}
              onClick={handleCloseMenu}
            >
              Phones
            </NavLink>
          </li>

          <li className="burger-header-menu__menu-item">
            <NavLink
              to="/tablets"
              className={getMobileLinkClass}
              onClick={handleCloseMenu}
            >
              Tablets
            </NavLink>
          </li>

          <li className="burger-header-menu__menu-item">
            <NavLink
              to="/accessories"
              onClick={handleCloseMenu}
              className={getMobileLinkClass}
            >
              Accessories
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};
