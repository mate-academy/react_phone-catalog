/* eslint-disable jsx-a11y/control-has-associated-label */
import cn from 'classnames';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

import {
  handleSearchBarVisibility,
} from '../../utils';
import { useAppSelector } from '../../app/hooks';
import { BREAKPOINTS } from '../../constants';

import { Logo } from '../Logo';
import { Navbar } from '../Navbar';
import { SearchBar } from '../SearchBar';
import { Icon } from '../Icon/Icon';
import { MobileNavMenu } from '../MobileNavMenu';
import { HeaderIconLink } from '../HeaderIconLink';

import './Header.scss';

type Props = {
  classNames?: string;
};

export const Header: React.FC<Props> = ({
  classNames,
}) => {
  const [
    isSearchInputExpanded,
    setIsSearchInputExpanded,
  ] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { cartItems } = useAppSelector(state => state.cartItems);
  const { favouritesItems } = useAppSelector(state => state.favouritesItems);
  const location = useLocation();
  const pathes = location.pathname.split('/').slice(1);
  const hasSearchBar = handleSearchBarVisibility(pathes);
  const isCartPage = pathes[0] === 'cart';
  const hasItemsInFavourites = !!favouritesItems.length;
  const hasItemsInCart = !!cartItems.length;

  const handleMenuButtonClick = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    if (isMobileMenuOpen && isMobile) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'scroll';
    }
  }, [isMobileMenuOpen, isMobile]);

  useEffect(() => {
    const onResize = () => {
      setIsMobile(window.innerWidth < BREAKPOINTS.tablet);
    };

    onResize();

    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <>
      <header className={cn('header', classNames)}>
        <div className="header__logo-container">
          <Logo />
        </div>

        <div className="header__nav-content">
          {!isMobile && (
            <div className={cn(
              'header__nav-menu',
              {
                'header__nav-menu--tablet':
              isSearchInputExpanded,
              },
            )}
            >
              {!isCartPage && (
                <Navbar />
              )}
            </div>
          )}

          {hasSearchBar && (
            <SearchBar
              classNames={cn(
                'header__search-bar',
                {
                  'header__search-bar--mobile':
                  isSearchInputExpanded,
                },
              )}
              isInputExpanded={isSearchInputExpanded}
              onClick={setIsSearchInputExpanded}
            />
          )}

          <div className="header__nav-icons">
            {!isCartPage && (
              <HeaderIconLink
                iconName="favourites"
                linkTo="favourites"
                hasItemsIn={hasItemsInFavourites}
                count={favouritesItems.length}
              />
            )}

            <HeaderIconLink
              iconName="shopping"
              linkTo="cart"
              hasItemsIn={hasItemsInCart}
              count={cartItems.length}
            />
          </div>

          <button
            type="button"
            className="header__mobile-menu-button"
            onClick={handleMenuButtonClick}
          >
            <Icon
              iconName={isMobileMenuOpen ? 'close' : 'burgerMenu'}
            />
          </button>
        </div>

      </header>

      {isMobile && (
        <div
          className="header__mobile-menu"
          style={
            isMobileMenuOpen ? {
              transition: 'all 0.8s',
              transform: 'translateX(0)',
            }
              : {
                transition: 'all 0.8s',
                transform: 'translateX(100%)',
              }
          }
        >
          <MobileNavMenu
            setIsOpen={setIsMobileMenuOpen}
            cartItemsCount={cartItems.length}
            favouritesItemsCount={favouritesItems.length}
            hasItemsInCart={hasItemsInCart}
            hasItemsInFavourites={hasItemsInFavourites}
          />
        </div>
      )}
    </>
  );
};
