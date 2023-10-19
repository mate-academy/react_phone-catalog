import React, { useContext } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import { CartContext } from '../../context/CartProvider';
import { FavouriteContext } from '../../context/FavouriteProvider';
import './Header.scss';

export const Header: React.FC = () => {
  const isActive = useLocation().pathname.slice(1);
  const { order } = useContext(CartContext);

  const totalQuantity = order.reduce(
    (sum, current) => sum + current.quantityInOrder,
    0,
  );

  const { favorites } = useContext(FavouriteContext);

  return (
    <div className="Header" id="header">
      <NavLink to="/home" className="Header__logo" />
      <div className="Header__left-block">
        {isActive !== 'cart' && (
          <nav className="Header__nav">
            <NavLink
              to="/home"
              className={
                classNames(`Header__link + ${isActive === ''
                  ? 'Header__link--active'
                  : ''
                }`)
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/phones"
              className={
                classNames(`Header__link + ${isActive === 'phones'
                  ? 'Header__link--active'
                  : ''
                }`)
              }
            >
              Phones
            </NavLink>
            <NavLink
              to="/tablets"
              className={
                classNames(`Header__link + ${isActive === 'tablets'
                  ? 'Header__link--active'
                  : ''
                }`)
              }
            >
              Tablets
            </NavLink>
            <NavLink
              to="/accessories"
              className={
                classNames(`Header__link + ${isActive === 'accessories'
                  ? 'Header__link--active'
                  : ''
                }`)
              }
            >
              Accessories
            </NavLink>
          </nav>
        )}
      </div>

      <div className="Header__right-block">
        {isActive !== 'cart' && (
          <NavLink
            to="/favourites"
            className={
              classNames(`Header__favourite-link + ${isActive === 'favourites'
                ? 'Header__link--active'
                : ''
              }`)
            }
          >
            {favorites.length > 0 && (
              <span className="Header__favorites-quantity">
                {favorites.length}
              </span>
            )}
          </NavLink>
        )}
        <NavLink
          to="/cart"
          className={
            classNames(`Header__cart-link + ${isActive === 'cart'
              ? 'Header__link--active'
              : ''
            }`)
          }
        >
          {order.length > 0 && (
            <span className="Header__order-quantity">{totalQuantity}</span>
          )}
        </NavLink>
      </div>
    </div>
  );
};
