import { NavLink, useLocation } from 'react-router-dom';
import cn from 'classnames';
import { NavBar } from '../NavBar/NavBar';
import './header.scss';
import { Logo } from '../Logo/Logo';
import { Search } from '../Search/Search';
import { useAppSelector } from '../../app/hooks';

export const Header = () => {
  const location = useLocation();
  const isFilterEnabled = location.pathname === '/phones';

  const favouriteProducts = useAppSelector(state => state.favourites.items);

  const cartProducts = useAppSelector(state => state.cartProducts.items);

  const getActiveClass = ({ isActive }: { isActive: boolean }) => cn(
    'icon icon-favourites', { 'icon-favourites-active': isActive },
  );

  const getActiveClassBag = ({ isActive }: { isActive: boolean }) => cn(
    'icon icon-bag', { 'icon-bag-active': isActive },
  );

  return (
    <header className="header">
      <div className="header-container">
        <Logo />
        <NavBar />
      </div>
      <div className="icon-container">
        {isFilterEnabled && <Search />}
        <div className="icon-favourites-container">
          <NavLink
            to="/favourites"
            className={getActiveClass}
          />
          {favouriteProducts.length > 0 && (
            <div className="icon icon-container icon-favourites-count">
              {favouriteProducts.length}
            </div>
          )}
        </div>
        <div className="icon-container icon-bag-container">
          <NavLink to="/bag" className={getActiveClassBag} />
          {cartProducts.length > 0 && (
            <div className="icon icon-bag-count">
              {cartProducts.length}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
