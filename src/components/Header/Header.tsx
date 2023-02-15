import classNames from 'classnames';
import { useContext } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { CartContext } from '../../CartContext';
import { FavContext } from '../../FavContext';
import { PageNavLink } from '../PageNavLink/PageNavLink';
import { Search } from '../Search/Search';
import './Header.scss';

export const Header: React.FC = () => {
  const location = useLocation();
  const { favourites } = useContext(FavContext);
  const { cartItems } = useContext(CartContext);
  const [seachParams] = useSearchParams();
  const query = seachParams.get('query' || '');

  return (
    <nav className="navbar">
      <Link to="/" className="navbar__logo">
        <img src="../../img/logo.svg" alt="logo" className="logo" />
      </Link>

      {location.pathname !== '/cart' && (
        <div className="navbar__list">
          <PageNavLink to="/" text="HOME" />
          <PageNavLink to="/phones" text="PHONES" />
          <PageNavLink to="/tablets" text="TABLETS" />
          <PageNavLink to="/accessories" text="ACCESSORIES" />
        </div>
      )}

      {location.pathname === '/phones' || location.pathname === '/favourites'
        || location.pathname === '/tablets'
        || location.pathname === '/accessories'
        ? (
          <Search query={query} />
        )
        : ('')}

      <div className="navbar__icons">
        {location.pathname !== '/cart'
          ? (
            <Link
              to="/favourites"
              className={classNames(
                'navbar__icon', {
                  'navbar__icon--isActive': location.pathname === '/favourites',
                },
              )}
            >
              {favourites.length > 0
                ? (
                  <>
                    <img
                      src="../../img/favourites.svg"
                      alt="favourites"
                      className="icon"
                    />

                    <div className="navbar__countCircle">
                      <img
                        src="../../img/redCircle.svg"
                        alt="count"
                        className="navbar__circle"
                      />

                      <p className="navbar__count">
                        {favourites.length}
                      </p>
                    </div>
                  </>
                )
                : (
                  <img
                    src="../../img/favourites.svg"
                    alt="favourites"
                    className="icon"
                  />
                )}
            </Link>
          )
          : ''}
        <Link
          to="/cart"
          className={classNames(
            'navbar__icon', {
              'navbar__icon--isActive': location.pathname === '/cart',
            },
          )}
        >
          {cartItems.length > 0
            ? (
              <>
                <img
                  src="../../img/cart.svg"
                  alt="cart"
                  className="icon"
                />

                <div className="navbar__countCircle">
                  <img
                    src="../../img/redCircle.svg"
                    alt="count"
                    className="navbar__circle"
                  />

                  <p className="navbar__count">
                    {cartItems.length}
                  </p>
                </div>
              </>
            )
            : (
              <img
                src="../../img/cart.svg"
                alt="cart"
                className="icon"
              />
            )}
        </Link>
      </div>
    </nav>
  );
};
