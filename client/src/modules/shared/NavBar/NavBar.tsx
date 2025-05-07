import { Link, NavLink, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import cn from 'classnames';
import { MenuPage } from '../Menu';
import { useAppSelector } from '../../../store/hooks';

const getActiveLink = ({ isActive }: { isActive: boolean }) => {
  return cn('nav-bar__link', {
    'selected-link': isActive,
  });
};

const getActiveTab = ({ isActive }: { isActive: boolean }) => {
  return cn('nav-bar__icon', {
    'selected-tab': isActive,
  });
};

export const NavBar = () => {
  const { favorites, cart } = useAppSelector(state => state.products);
  const { viewportWidth } = useAppSelector(state => state.viewport);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => setIsMenuOpen(false), [location.pathname]);

  const handleMenuOpen = () => setIsMenuOpen(!isMenuOpen);

  return (
    <>
      <nav className="nav-bar">
        <div className="nav-bar__left-group">
          <Link to="/" className="nav-bar__logo" />

          {viewportWidth >= 640 && (
            <ul className="nav-bar__links">
              <NavLink to="/" className={getActiveLink}>
                Home
              </NavLink>
              <NavLink to="/phones" className={getActiveLink}>
                Phones
              </NavLink>
              <NavLink to="/tablets" className={getActiveLink}>
                Tablets
              </NavLink>
              <NavLink to="/accessories" className={getActiveLink}>
                Accessories
              </NavLink>
            </ul>
          )}
        </div>

        <div className="nav-bar__right-group">
          {viewportWidth >= 640 ? (
            <>
              <NavLink to="/favorites" className={getActiveTab}>
                <div className="nav-bar__favorite icon">
                  {!!favorites?.length && (
                    <div className="nav-bar__icon-text">
                      {favorites?.length}
                    </div>
                  )}
                </div>
              </NavLink>

              <NavLink to="/cart" className={getActiveTab}>
                <div className="nav-bar__cart icon">
                  {!!cart?.length && (
                    <div className="nav-bar__icon-text">{cart?.length}</div>
                  )}
                </div>
              </NavLink>
            </>
          ) : (
            <a className="nav-bar__icon" onClick={handleMenuOpen}>
              <div
                className={cn('icon', {
                  'nav-bar__menu': !isMenuOpen,
                  'nav-bar__close': isMenuOpen,
                })}
              />
            </a>
          )}
        </div>
      </nav>
      {isMenuOpen && <MenuPage />}
    </>
  );
};
