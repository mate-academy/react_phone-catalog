import cn from 'classnames';
import { NavLink, useLocation } from 'react-router-dom';

import { Logo } from '../Logo';
import { Navbar } from '../Navbar/Navbar';
import { SearchBar } from '../SearchBar';
import { Icon } from '../Icon/Icon';

import './Header.scss';

type Props = {
  classNames?: string;
};

export const handleSearchBarVisibility = (pathes: string[]) => {
  if (pathes.length === 1 && (pathes[0] !== '' && pathes[0] !== 'cart')) {
    return true;
  }

  return false;
};

export const Header: React.FC<Props> = ({
  classNames,
}) => {
  const location = useLocation();
  const pathes = location.pathname.split('/').slice(1);
  const hasSearchBar = handleSearchBarVisibility(pathes);
  const isCartPage = pathes[0] === 'cart';

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
            { true
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
              'header__icon-link header__icon-link--last',
              { 'header__link--active': isActive },
            )
          )}
        >
          { true
            ? (
              <Icon
                iconName="shopping"
                classNames="icon"
              />
            )

            : (
              <Icon
                iconName="shoppingCounter"
                classNames="icon icon--with-heart"
              />
            )}
        </NavLink>
      </div>

    </header>
  );
};
