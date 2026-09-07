import { useState } from 'react';
import './Header.scss';
import { Link, NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { useAppSelector } from '../../customHooks/customHooks';
import logo from '../../images/logo/headerLogo.png';
import favoritesImg from '../../images/logo/favorites.svg';
import cartImg from '../../images/logo/shopingBagLogo.png';
import burgerMenu from '../../images/logo/burgerMenuLogo.png';
import closeImg from '../../images/logo/closeIcon.png';

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { favorites } = useAppSelector(state => state.favorites);
  const { productsInCart } = useAppSelector(state => state.cart);

  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    classNames('header__nav__item_link', {
      'header__nav__item_link--active': isActive,
    });

  const totalCartQuantity = productsInCart.reduce(
    (acc, product) => acc + product.quantity,
    0,
  );

  return (
    <>
      <header className="header">
        <div className="header__top-bar">
          <div className="header__top-bar_left-side">
            <div className="header__logo">
              <Link to="/">
                <img src={logo} alt="" className="header__logo_img" />
              </Link>
            </div>

            <nav className="header__nav">
              <ul className="header__nav__list">
                <li className="header__nav__item">
                  <NavLink className={getLinkClass} to="/">
                    HOME
                  </NavLink>
                </li>
                <li className="header__nav__item">
                  <NavLink className={getLinkClass} to="/phones">
                    PHONES
                  </NavLink>
                </li>
                <li className="header__nav__item">
                  <NavLink className={getLinkClass} to="/tablets">
                    TABLETS
                  </NavLink>
                </li>
                <li className="header__nav__item">
                  <NavLink className={getLinkClass} to="/accessories">
                    ACCESORIES
                  </NavLink>
                </li>
              </ul>
            </nav>
          </div>

          <div className="header__top-bar_right-side">
            <div className="header__icons">
              <NavLink
                to="/favorites"
                className={({ isActive }) =>
                  classNames('header__icons__favorites', {
                    'header__icons__favorites-isActive': isActive,
                  })
                }
              >
                <img
                  src={favoritesImg}
                  alt="Favorites"
                  className="header__icons__favorites__img"
                />
                {favorites.length > 0 && (
                  <div className="header__icons__favorites__img-count">
                    {favorites.length}
                  </div>
                )}
              </NavLink>

              <NavLink
                to="/cart"
                className={({ isActive }) =>
                  classNames('header__icons__cart', {
                    'header__icons__cart-isActive': isActive,
                  })
                }
              >
                <img
                  src={cartImg}
                  alt="Cart"
                  className="header__icons__cart__img"
                />
                {productsInCart.length > 0 && (
                  <div className="header__icons__cart__img-count">
                    {totalCartQuantity}
                  </div>
                )}
              </NavLink>
            </div>
          </div>

          <a
            href="#burger_menu"
            className="header__burger_menu"
            onClick={() => setIsOpen(true)}
          >
            <img
              src={burgerMenu}
              alt="Menu"
              className="header__burger_menu_img"
            />
          </a>
        </div>
      </header>

      {isOpen && (
        <aside className="burger_menu" id="burger_menu">
          <div className="burger_menu__top">
            <div className="burger_menu__logo">
              <a href="#/">
                <img src={logo} alt="Logo" className="burger_menu__logo_img" />
              </a>
            </div>
            <a
              href="#/"
              className="burger_menu__icon"
              onClick={() => setIsOpen(false)}
            >
              <img
                src={closeImg}
                alt="Close"
                className="burger_menu__icon_img"
              />
            </a>
          </div>

          <nav className="burger_menu__nav">
            <ul className="burger_menu__nav__list">
              <li className="burger_menu__nav__item">
                <NavLink
                  className={getLinkClass}
                  to="/"
                  onClick={() => setIsOpen(false)}
                >
                  Home
                </NavLink>
              </li>

              <li className="burger_menu__nav__item">
                <NavLink
                  className={getLinkClass}
                  to="/phones"
                  onClick={() => setIsOpen(false)}
                >
                  Phones
                </NavLink>
              </li>

              <li className="burger_menu__nav__item">
                <NavLink
                  className={getLinkClass}
                  to="/tablets"
                  onClick={() => setIsOpen(false)}
                >
                  Tablets
                </NavLink>
              </li>
              <li className="burger_menu__nav__item">
                <NavLink
                  className={getLinkClass}
                  to="/accessories"
                  onClick={() => setIsOpen(false)}
                >
                  Accessories
                </NavLink>
              </li>
            </ul>
          </nav>

          <div className="burger_menu__bottom">
            <NavLink
              to="/favorites"
              className="burger_menu__bottom_icon burger_menu__bottom-fav"
              onClick={() => setIsOpen(false)}
            >
              <img
                src={favoritesImg}
                alt="Favorites"
                className="burger_menu__bottom_icon__img"
              />
              {favorites.length > 0 && (
                <div className="header__icons__favorites__img-count">
                  {favorites.length}
                </div>
              )}
            </NavLink>

            <NavLink
              to="/cart"
              className="burger_menu__bottom_icon burger_menu__bottom-cart"
              onClick={() => setIsOpen(false)}
            >
              <img
                src={cartImg}
                alt="Cart"
                className="burger_menu__bottom_icon__img"
              />
              {productsInCart.length > 0 && (
                <div className="header__icons__cart__img-count">
                  {totalCartQuantity}
                </div>
              )}
            </NavLink>
          </div>
        </aside>
      )}
    </>
  );
};
