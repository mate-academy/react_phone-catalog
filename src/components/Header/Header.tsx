import { useAppSelector } from '../../app/hooks';
import './Header.scss';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import cn from 'classnames';

const getLinkClass = ({ isActive }: { isActive: boolean }) =>
  cn('top-bar__link', {
    'is-active': isActive,
  });

export const Header = () => {
  const { pathname } = useLocation();
  const { totalInFavorites } = useAppSelector(state => state.favorites);
  const { totalInCart } = useAppSelector(state => state.cart);
  const navigate = useNavigate();

  const isMenuOpened = pathname === '/menu';

  const handleMenuClick = () => {
    if (pathname === '/menu') {
      navigate(-1);
    }
  };

  return (
    <>
      <div className="top-bar">
        <div className="top-bar__container">
          <Link to="/" className="top-bar__logo">
            <img src="./img/logo.svg" alt="Logo" />
          </Link>
          <nav className="top-bar__links">
            <NavLink to="/" className={getLinkClass}>
              Home
            </NavLink>
            <NavLink to="/phones" className={getLinkClass}>
              Phones
            </NavLink>
            <NavLink to="/tablets" className={getLinkClass}>
              Tablets
            </NavLink>
            <NavLink to="/accessories" className={getLinkClass}>
              Accessories
            </NavLink>
          </nav>
          <nav className="top-bar__icons">
            <NavLink
              to="/favorites"
              className={cn('icon', 'icon--favourites', {
                'icon--active': pathname === '/favorites',
              })}
            >
              {totalInFavorites > 0 && (
                <span className="top-bar__icon-label">{totalInFavorites}</span>
              )}
            </NavLink>
            <NavLink
              to="/cart"
              className={cn('icon', 'icon--cart', {
                'icon--active': pathname === '/cart',
              })}
            >
              {totalInCart > 0 && (
                <span className="top-bar__icon-label">{totalInCart}</span>
              )}
            </NavLink>
          </nav>
          <div className="top-bar__menu">
            {isMenuOpened ? (
              <NavLink
                to="/"
                className="icon icon--close"
                onClick={handleMenuClick}
              ></NavLink>
            ) : (
              <NavLink to="/menu" className="icon icon--menu"></NavLink>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
