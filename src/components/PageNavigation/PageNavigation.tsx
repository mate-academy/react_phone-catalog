import './PageNavigation.scss';
import {
  useCallback,
  useContext,
  useMemo,
} from 'react';
import classNames from 'classnames';
import { NavLink, useLocation } from 'react-router-dom';
import { MenuContext } from '../MenuContextProvider';
import { ScreenSizeContext, ScreenType } from '../ScreenSizeProvider';
import { Icon } from '../Icon';
import { IconType } from '../../types/IconTypes';
import { navLinks } from '../../services/navLinks';
import {
  FavouritesContext,
} from '../FavouritesContextProvider';
import { CartContext } from '../CartContextProvider';
import { Search } from '../Search';
import { QuerySearchContext } from '../QuerySearchContext';

function getLinkClass({ isActive }: { isActive: boolean }) {
  return classNames('page-navigation__link', {
    'page-navigation__link--active': isActive,
  });
}

export const PageNavigation = () => {
  const { pathname } = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useContext(MenuContext);
  const screenSize = useContext(ScreenSizeContext);
  const {
    isProductPage,
    isSearchBarOpen,
    setIsSearchBarOpen,
    onBlur,
    onSearchDelete,
  } = useContext(QuerySearchContext);
  const { favourites } = useContext(FavouritesContext);
  const { cart } = useContext(CartContext);

  const favouritesQuantity = useMemo(() => favourites.length, [favourites]);
  const cartQuantity = useMemo(() => cart.reduce((prev, { quantity }) => {
    return prev + quantity;
  }, 0), [cart]);

  const isSearchVisible = useMemo(() => {
    return isProductPage && (screenSize === ScreenType.isDesktop
      || (screenSize === ScreenType.isTablet && isSearchBarOpen));
  }, [isProductPage, screenSize, isSearchBarOpen]);

  const isSearchButtonVisible = useMemo(() => {
    return isProductPage
      && screenSize === ScreenType.isTablet && !isSearchBarOpen;
  }, [isProductPage, screenSize, isSearchBarOpen]);

  const handleMenuLinkClick = useCallback(() => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  }, [isMenuOpen, setIsMenuOpen]);

  return (
    <div className={classNames('page-navigation', {
      'page-navigation--active': isMenuOpen
        && screenSize === ScreenType.isMobile,
    })}
    >
      <nav className={classNames('page-navigation__nav', {
        'page-navigation__nav--active': isMenuOpen
          && screenSize === ScreenType.isMobile,
      })}
      >
        <ul className="page-navigation__list">
          {navLinks.map(({ name, link }) => (
            <li key={name} className="page-navigation__item">
              <NavLink
                to={link}
                onClick={handleMenuLinkClick}
                className={getLinkClass}
              >
                {name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className={classNames('page-navigation__buttons', {
        'page-navigation__buttons--active': isMenuOpen
          && screenSize === ScreenType.isMobile,
      })}
      >

        {isSearchVisible && (
          <Search
            searchName="query"
            onBlur={screenSize === ScreenType.isTablet ? onBlur : () => {}}
            onDelete={screenSize === ScreenType.isTablet
              ? onSearchDelete : () => {}}
            showSearchIcon={screenSize === ScreenType.isDesktop}
          />
        )}

        {isSearchButtonVisible && (
          <button
            type="button"
            aria-label="search trigger"
            className="top-bar-button"
            onClick={() => setIsSearchBarOpen(true)}
          >
            <Icon iconType={IconType.search} />
          </button>
        )}

        {(!isSearchBarOpen || screenSize === ScreenType.isDesktop) && (
          <>
            <NavLink
              to="favourites"
              aria-label="favourites link"
              type="button"
              className={({ isActive }: { isActive: boolean }) => classNames(
                'top-bar-button',
                {
                  'top-bar-button--active': isActive,
                  'top-bar-button--menu': screenSize === ScreenType.isMobile,
                },
              )}
            >
              {favouritesQuantity ? (
                <Icon
                  iconType={IconType.heartCounter}
                  quantity={favouritesQuantity}
                />
              ) : (
                <Icon iconType={IconType.heart} />
              )}
            </NavLink>

            <NavLink
              to="cart"
              state={pathname}
              aria-label="cart link"
              type="button"
              className={({ isActive }: { isActive: boolean }) => classNames(
                'top-bar-button',
                {
                  'top-bar-button--active': isActive,
                  'top-bar-button--menu': screenSize === ScreenType.isMobile,
                },
              )}
            >
              {cartQuantity ? (
                <Icon iconType={IconType.cartCounter} quantity={cartQuantity} />
              ) : (
                <Icon iconType={IconType.cart} />
              )}
            </NavLink>
          </>
        )}
      </div>
    </div>
  );
};
