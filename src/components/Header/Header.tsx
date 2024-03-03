import {
  memo, useCallback, useMemo, useState,
} from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';
import cn from 'classnames';
import { Icons } from '../../types/Icons';
import { Icon } from '../Icon';
import { Navigation } from '../Navigation';
import { Searchbar } from '../Searchbar';
import './Header.scss';
import { selectCart } from '../../store/selectors/cartSlice';
import { selectFavorites } from '../../store/selectors/favoritesSlice';
import { Menu } from '../Menu';

export const Header = memo(() => {
  const [isOpen, setIsOpen] = useState(false);

  const location = useLocation();
  const currentPageName = useMemo(() => {
    return location.pathname.slice(1);
  }, [location]);

  const onPage = useMemo(() => {
    return location.pathname.split('/').length === 2 && currentPageName;
  }, [location, currentPageName]);

  const { cart } = useSelector(selectCart);
  const { favorites } = useSelector(selectFavorites);

  const onClickHide = useCallback(() => {
    setIsOpen(false);
  }, []);

  const onClickToggle = useCallback(() => {
    return setIsOpen(prev => !prev);
  }, []);

  return (
    <div className="header">
      <button
        aria-label="burger-menu"
        type="button"
        className={cn('header__burger', {
          'header__burger--open': isOpen,
        })}
        onClick={onClickToggle}
      >
        <div className="header__burger__line" />
        <div className="header__burger__line" />
        <div className="header__burger__line" />
      </button>
      <div className="header__mobile">
        <Menu
          isOpen={isOpen}
          favoritesItemsCount={favorites?.length}
          cartItemsCount={cart?.length}
          onClick={onClickHide}
        />
        {(onPage && onPage !== 'cart') && (
          <Searchbar placeholder={currentPageName} />
        )}
      </div>

      <div className="header__desktop">
        <div className="header__left-container">
          <span className="header__logo" />
          <Navigation />
        </div>
        <div className="header__right-container">
          {(onPage && onPage !== 'cart') && (
            <Searchbar placeholder={currentPageName} />
          )}
          <NavLink to="/favorites">
            <div className="header__right__controls">
              <Icon icon={Icons.Heart} counter={favorites?.length} />
            </div>
          </NavLink>
          <NavLink
            to="/cart"
            className="header__right__controls"
          >
            <Icon icon={Icons.Cart} counter={cart?.length} />
          </NavLink>
        </div>
      </div>
    </div>
  );
});
