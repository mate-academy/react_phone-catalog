import cn from 'classnames';
import { NavLink, useLocation } from 'react-router-dom';

import {
  handleSearchBarVisibility,
} from '../../utils';
import { useAppSelector } from '../../app/hooks';

import { Logo } from '../Logo';
import { Navbar } from '../Navbar';
import { SearchBar } from '../SearchBar';
import { Icon } from '../Icon/Icon';

import './Header.scss';

type Props = {
  classNames?: string;
};

export const Header: React.FC<Props> = ({
  classNames,
}) => {
  const { items } = useAppSelector(state => state.cartItems);
  const location = useLocation();
  const pathes = location.pathname.split('/').slice(1);
  const hasSearchBar = handleSearchBarVisibility(pathes);
  const isCartPage = pathes[0] === 'cart';
  const isFav = true;
  const hasItemsInCart = !!items.length;

  return (
    <header className={cn('header', classNames)}>
      <div className="header__content">
        <Logo classNames="header__logo" />
        {!isCartPage && <Navbar />}
      </div>

      <div className="header__content">
        {hasSearchBar && <SearchBar className="header__search-bar" />}

        {!isCartPage && (
          <NavLink
            to="favourites"
            className={({ isActive }) => (
              cn(
                'header__icon-link',
                { 'header__link--active': isActive },
              )
            )}
          >
            { isFav
              ? (
                <Icon
                  iconName="favourites"
                  classNames="icon"
                />
              )

              : (
                <Icon
                  iconName="favouritesCounter"
                  classNames="icon icon--with-heart"
                />
              )}
          </NavLink>
        )}

        <NavLink
          to="cart"
          className={({ isActive }) => (
            cn(
              'header__icon-link',
              { 'header__link--active': isActive },
            )
          )}
        >
          { hasItemsInCart
            ? (
              <div className="header__icon-container">
                <Icon
                  iconName="shopping"
                  classNames="icon"
                />

                <span className="icon__count">
                  {items.length}
                </span>
              </div>
            )

            : (
              <Icon
                iconName="shopping"
                classNames="icon"
              />
            )}
        </NavLink>
      </div>

    </header>
  );
};
