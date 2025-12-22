import { FavoriteAndCart } from './components/FavoriteAndCart';
import { HeaderNavItems } from './components/HeaderNavItems';
import { Logo } from './components/Logo';
import styles from './Header.module.scss';
import { useState } from 'react';

import burgerIcon from '/icons/menu-icon.png';
import closeIcon from '/icons/close-icon.png';
import { useCart } from '../../contexts/CartContext';
import { useFavorites } from '../../contexts/FavoritesContext';

export const Header: React.FC = () => {
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);
  const { totalQuantity } = useCart();
  const { totalFavorites } = useFavorites();

  const toggleBurger = () => {
    setIsBurgerOpen(prev => !prev);
  };

  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.left}>
          <Logo />
          <div className={styles.navLinks}>
            <HeaderNavItems />
          </div>
        </div>

        <nav className={styles.right}>
          <FavoriteAndCart
            cartCount={totalQuantity}
            favCount={totalFavorites}
          />
        </nav>

        <div className={styles.burger_container}>
          <button className={styles.burger_button} onClick={toggleBurger}>
            <img src={burgerIcon} alt="burgerIcon" />
          </button>
        </div>

        {isBurgerOpen && (
          <div className={styles.burgerMenu}>
            <div className={styles.burger_header}>
              <Logo />
              <button className={styles.close_button} onClick={toggleBurger}>
                <img src={closeIcon} alt="closeIcon" />
              </button>
            </div>

            <HeaderNavItems
              className={styles.burgerNav}
              onLinkClick={toggleBurger}
            />
            <FavoriteAndCart
              className={styles.burgerFavAndCartIcons}
              isBurger={true}
              onLinkClick={toggleBurger}
              cartCount={totalQuantity}
              favCount={totalFavorites}
            />
          </div>
        )}
      </div>
    </header>
  );
};
