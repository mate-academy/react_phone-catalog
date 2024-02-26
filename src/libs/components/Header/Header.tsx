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
  const { cartItems } = useAppSelector(state => state.cartItems);
  const { favouritesItems } = useAppSelector(state => state.favouritesItems);
  const location = useLocation();
  const pathes = location.pathname.split('/').slice(1);
  const hasSearchBar = handleSearchBarVisibility(pathes);
  const isCartPage = pathes[0] === 'cart';
  const hasItemsInFavourites = !!favouritesItems.length;
  const hasItemsInCart = !!cartItems.length;

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
            <div className="header__icon-container">
              <Icon
                iconName="favourites"
                classNames="icon"
              />

              {hasItemsInFavourites && (
                <span className="icon__count">
                  {favouritesItems.length}
                </span>
              )}
            </div>

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
          <div className="header__icon-container">
            <Icon
              iconName="shopping"
              classNames="icon"
            />

            {hasItemsInCart && (
              <span className="icon__count">
                {cartItems.length}
              </span>
            )}
          </div>

        </NavLink>
      </div>

    </header>
  );
};
