import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { HeaderActions } from './components/HeaderActions';
import { Burger } from './components/Burger';
import { BurgerMenu } from './components/BurgerMenu';
import { Nav } from '../Nav';
import { SearchInput } from './components/SearchInput';

import { Logo } from '../Logo/Logo';
import './Header.scss';
import { useFavorites } from '@/shared/context/FavoriteContext';
import { useCart } from '@/shared/context/CartContext';

/**
 * Defines the routes where the search field is allowed to be visible.
 * @type {readonly string[]}
 */
const SEARCH_ALLOWED_ROUTES = [
  '/phones',
  '/tablets',
  '/accessories',
  '/favorites',
] as const;

/**
 * Header component that displays the application's navigation, logo, search field, and user actions.
 * It also manages the state of a burger menu for mobile navigation and its behavior based on screen size.
 *
 * @returns {JSX.Element} The rendered header component.
 */
export const Header = () => {
  const { pathname } = useLocation();
  const { totalFavorites } = useFavorites();
  const { totalCartItems } = useCart();
  const hasItems = totalFavorites > 0 || totalCartItems > 0;

  /**
   * State to control the visibility of the burger menu.
   * @type {[boolean, React.Dispatch<React.SetStateAction<boolean>>]}
   */
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);

  useEffect(() => {
    setIsBurgerMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 640px)');

    /**
     * Handles the closing of the burger menu when the screen size changes to a wider view.
     * @param {MediaQueryListEvent} e - The media query list event.
     */
    const handleCloseBurger = (e: MediaQueryListEvent) => {
      if (e.matches) {
        return setIsBurgerMenuOpen(false);
      }
    };

    mediaQuery.addEventListener('change', handleCloseBurger);

    return () => {
      mediaQuery.removeEventListener('change', handleCloseBurger);
    };
  }, []);

  /**
   * Determines if the search field should be visible based on the current pathname.
   * @type {boolean}
   */
  const isSearchVisible = (SEARCH_ALLOWED_ROUTES as readonly string[]).includes(
    pathname,
  );

  return (
    <header className="header">
      <div className="header__container">
        <Logo className="header__logo" />

        <Nav className="header__desktop-nav" />

        {isSearchVisible && <SearchInput className="header__search" />}
        <div className="header__desktop-actions">
          <HeaderActions />
        </div>

        <Burger
          className="header__burger"
          onOpenChange={setIsBurgerMenuOpen}
          isOpen={isBurgerMenuOpen}
          hasItems={hasItems}
        />

        <BurgerMenu isBurgerMenuOpen={isBurgerMenuOpen} />
      </div>
    </header>
  );
};
