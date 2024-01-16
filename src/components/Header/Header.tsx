import { Link, NavLink, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import cn from 'classnames';
import { ICONS } from '../../icons';
import './Header.scss';
import { GlobalContext } from '../Context/GlobalContext';
import { Navigation } from '../Navigation/Navigation';
import { Search } from '../Search/Search';

const getLinkClassIcon = ({ isActive }: { isActive: boolean }) => cn({
  'header__right-link': true,
  'header__right-link--active': isActive,
});

export const Header = () => {
  const { cart, favList } = useContext(GlobalContext);
  const { pathname } = useLocation();

  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);

  const isSearchVisible = pathname === '/phones'
    || pathname === '/tablets'
    || pathname === '/favourites'
    || pathname === '/accessories';

  return (
    <header className="header">
      <div className="header__left-box">
        <div className="header__logo">
          <Link to="/">
            <img src={ICONS.logo} alt="logo" />
          </Link>
        </div>
        {pathname !== '/cart' && <Navigation />}
      </div>

      <div className="header__right-box">
        {isSearchVisible && <Search />}

        {pathname !== '/cart' && (
          <NavLink to="/favourites" className={getLinkClassIcon}>
            <div className="icon__container">
              <img
                src={ICONS.favourites}
                className="icon"
                alt="favourites"
              />
              {!!favList.length && (
                <div className="counter">
                  {favList.length}
                </div>
              )}
            </div>
          </NavLink>
        )}

        <NavLink to="/cart" className={getLinkClassIcon}>
          <div className="icon__container">
            <img
              src={ICONS.shoppingCart}
              className="icon"
              alt="shopping cart"
            />
            {!!cart.length && (
              <div className="counter">
                {totalQuantity}
              </div>
            )}
          </div>
        </NavLink>
      </div>
    </header>
  );
};
