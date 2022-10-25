import { Link, NavLink, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import { useEffect } from 'react';
import * as cartProductActions
  from '../../app/features/cartProductsSlice';
import * as favoritesActions
  from '../../app/features/favoritesSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Product } from '../../types/Product';
import { Search } from '../Search';
import './Header.scss';

type Props = {
  products: Product[];
};

const mainLinks = [
  { id: 1, name: 'Home', adress: '/' },
  { id: 2, name: 'Phones', adress: '/phones' },
  { id: 3, name: 'Tablets', adress: '/tablets' },
  { id: 4, name: 'Accessories', adress: '/accessories' },
];

export const Header: React.FC<Props> = ({ products }) => {
  const { cartProducts } = useAppSelector(state => state.cartProducts);
  const { favorites } = useAppSelector(state => state.favorites);
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const pathArray = pathname.split('/');
  const pageName = pathArray[1];
  const type = pageName.slice(0, pageName.length - 1);

  const isSearchVisible
    = products.filter(product => product.type === type).length > 0;

  useEffect(() => {
    const cartFromLocalStorage = localStorage.getItem('cart');

    if (cartFromLocalStorage) {
      dispatch(
        cartProductActions.setCartProducts(
          JSON.parse(cartFromLocalStorage),
        ),
      );
    }

    const favoritesFromLocalStorage = localStorage.getItem('favorites');

    if (favoritesFromLocalStorage) {
      dispatch(
        favoritesActions.setFavorites(
          JSON.parse(favoritesFromLocalStorage),
        ),
      );
    }
  }, []);

  return (
    <div className="Header">
      <nav className="Header__navblock">
        <Link to="/">
          <div className="logo" />
        </Link>
        <nav
          data-cy="categoryLinksContainer"
        >
          {pathname !== '/cart'
            && (
              <ul className="navbar__list">
                {mainLinks.map(link => (
                  <li
                    key={link.id}
                    className="navbar__item"
                  >
                    <NavLink
                      to={link.adress}
                      className={({ isActive }) => classNames(
                        'link',
                        'Header__link',
                        {
                          'link--is-active': (
                            link.adress === '/'
                              ? isActive && pathname === link.adress
                              : isActive && pathname.includes(link.adress)
                          ),
                        },
                      )}
                    >
                      {link.name}
                    </NavLink>
                  </li>
                ))}
              </ul>
            )}
        </nav>
      </nav>

      <div className="container">
        {(isSearchVisible && pathArray.length < 3)
           && (
             <Search
               pageName={pageName}
             />
           )}

        <nav className="Header__cartblock">
          {pathname !== '/cart'
            && (
              <NavLink
                to="/favorites"
                className={({ isActive }) => classNames(
                  'link',
                  'Order__favorite-button',
                  'Header__favorite-button',
                  { 'link--is-active': isActive },
                )}
              >
                {favorites.length > 0
                && (
                  <div className="Header__counter">
                    {favorites.length}
                  </div>
                )}
              </NavLink>
            )}

          <NavLink
            to="/cart"
            className={({ isActive }) => classNames(
              'link',
              'Header__cart-button',
              { 'link--is-active': isActive },
            )}
          >
            {cartProducts.length > 0
            && (
              <div className="Header__counter">
                {cartProducts.length}
              </div>
            )}
          </NavLink>
        </nav>
      </div>
    </div>
  );
};
