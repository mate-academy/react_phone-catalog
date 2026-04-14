import classNames from 'classnames';
import styles from './Header.module.scss';
import { useFavorites } from '../../modules/shared/context/FavoritesContext';
import { useCart } from '../../modules/shared/context/CartContext';
import { Logo } from '../Logo';
import { Navigation } from './components/Navigation';
import { Actions } from './components/Actions';
import { Icon } from '../Icon';
import { useState } from 'react';
import { BurgerMenu } from './components/BurgerMenu';
import { ThemeToggler } from './components/ThemeToggler';
import { useLocation } from 'react-router-dom';
import { SearchField } from './components/SearchField';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const { favorites } = useFavorites();
  const { cartItems } = useCart();

  const isSearchVisible = ['/phones', '/tablets', '/accessories'].includes(pathname);

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  };

  return (
    <header className={styles.header}>
      <div className={classNames(styles.content, 'grid')}>
        <Logo className={styles.headerLogo} />

        <Navigation />

        {isSearchVisible && <SearchField />}

        <div className={styles.rightSection}>
          <div className={styles.togglerWrapper}>
            <ThemeToggler />
          </div>

          <Actions cartCount={cartItems.length} favCount={favorites.length} />

          <div className={styles.burger} onClick={toggleMenu}>
            <Icon variant={isMenuOpen ? 'close' : 'menu'} />
          </div>
        </div>
      </div>

      <BurgerMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        cartCount={cartItems.length}
        favCount={favorites.length}
      />
    </header>
  );
};
