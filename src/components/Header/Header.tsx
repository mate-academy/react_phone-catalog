import { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';
import cn from 'classnames';
import { Icons } from '../../types/enums/Icons';
import { Icon } from '../Icon';
import { Navigation } from '../Navigation';
import { Searchbar } from '../Searchbar';
import './Header.scss';
import { selectCart } from '../../store/selectors/cartSlice';
import { selectFavorites } from '../../store/selectors/favoritesSlice';
import { Menu } from '../Menu';

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const location = useLocation();
  const currentPageName = location.pathname.slice(1);

  const onPage = location.pathname.split('/').length === 2 && currentPageName;

  const { cart } = useSelector(selectCart);
  const { favorites } = useSelector(selectFavorites);
  const cartItemsCount = cart?.length;
  const favoritesItemsCount = favorites?.length;

  const onClick = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <div className="header">
      <button
        aria-label="burger-menu"
        type="button"
        className={cn('header__burger', {
          'header__burger--open': isOpen,
        })}
        onClick={() => setIsOpen(prev => !prev)}
      >
        <div className="header__burger__line" />
        <div className="header__burger__line" />
        <div className="header__burger__line" />
      </button>
      <div className="header__mobile">
        <Menu
          isOpen={isOpen}
          favoritesItemsCount={favoritesItemsCount}
          cartItemsCount={cartItemsCount}
          onClick={onClick}
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
              <Icon icon={Icons.Heart} counter={favoritesItemsCount} />
            </div>
          </NavLink>
          <NavLink
            to="/cart"
            className="header__right__controls"
          >
            <Icon icon={Icons.Cart} counter={cartItemsCount} />
          </NavLink>
        </div>
      </div>
    </div>
  );
};
