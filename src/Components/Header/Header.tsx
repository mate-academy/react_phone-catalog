import { NavLink } from 'react-router-dom';
import './Header.scss';
import classNames from 'classnames';
import { useCart } from '../../context/cartContext';
import { useFavorites } from '../../context/favoritesContext';
import { useEffect, useState } from 'react';

export const Header: React.FC = () => {
  const [currentwidth, setCurrentWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setCurrentWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const ActivateLink = ({ isActive }: { isActive: boolean }) =>
    classNames('header__nav--link', {
      'has-background-white': isActive,
    });

  const IconsActivateLink = ({ isActive }: { isActive: boolean }) =>
    classNames('header__nav--icons--section', {
      'has-underline': isActive,
    });

  const { cart } = useCart();
  const { favorites } = useFavorites();

  const totalCount = cart.reduce((acc, cartItem) => {
    return acc + cartItem.count;
  }, 0);

  return (
    <div className="header">
      <div>
        <NavLink to="/">
          <img
            className="header__logo"
            src="public/img/ui-kit/header-logo.png"
            alt="header__logo"
          />
        </NavLink>
      </div>

      <nav className="header__nav">
        {+currentwidth > 639 ? (
          <>
            <div className="header__nav--links">
              <NavLink className={ActivateLink} to="/">
                home
              </NavLink>
              <NavLink className={ActivateLink} to="/phones">
                phones
              </NavLink>
              <NavLink className={ActivateLink} to="/tablets">
                tablets
              </NavLink>
              <NavLink className={ActivateLink} to="/accessories">
                accessories
              </NavLink>
            </div>

            <div className="header__nav--icons">
              <div className="header__nav--icons--section">
                <NavLink className={IconsActivateLink} to="/favorites">
                  <img
                    src="/img/ui-kit/favorites-icon.png"
                    alt="favorites-icon"
                  />
                </NavLink>

                {favorites.length > 0 && (
                  <div className="favorites-count-elements">
                    {favorites.length}
                  </div>
                )}
              </div>

              <div className="header__nav--icons--section">
                <NavLink className={IconsActivateLink} to="/cart">
                  <img
                    src="/img/ui-kit/Shopping-bag.png"
                    alt="Shopping-bag.png"
                  />
                </NavLink>

                {totalCount > 0 && (
                  <div className="cart-count-elements">{totalCount}</div>
                )}
              </div>
            </div>
          </>
        ) : (
          <div className="header__nav--icons--section">
            <NavLink className="header__nav--icons--section--menu" to="/menu">
              <img src="/img/ui-kit/Menu.png" alt="menu-icon" />
            </NavLink>
          </div>
        )}
      </nav>
    </div>
  );
};
