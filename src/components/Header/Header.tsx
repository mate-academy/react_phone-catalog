import { useEffect, useState } from 'react';
import { FavoriteAndCart } from './components/FavoriteAndCart';
import { HeaderNavItems } from './components/HeaderNavItems';
import { Logo } from './components/Logo';
import styles from './Header.module.scss';

import burgerIcon from '/icons/menu-icon.png';
import closeIcon from '/icons/close-icon.png';

import { useCart } from '../../contexts/CartContext';
import { useFavorites } from '../../contexts/FavoritesContext';

export const Header: React.FC = () => {
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);
  const { totalQuantity } = useCart();
  const { totalFavorites } = useFavorites();

  const openBurger = () => setIsBurgerOpen(true);
  const closeBurger = () => setIsBurgerOpen(false);

  useEffect(() => {
    if (isBurgerOpen) {
      document.body.style.overflow = 'hidden'; // блокуємо вертикальний і горизонтальний скрол
      document.body.style.width = '100vw'; // прибирає горизонтальний стрибок
    } else {
      document.body.style.overflow = '';
      document.body.style.width = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.width = '';
    };
  }, [isBurgerOpen]);

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <Logo />
        <div className={styles.navLinks}>
          <HeaderNavItems />
        </div>
      </div>

      <nav className={styles.right}>
        <FavoriteAndCart cartCount={totalQuantity} favCount={totalFavorites} />
      </nav>

      <div className={styles.burger_container}>
        <button
          className={styles.burger_button}
          onClick={openBurger}
          aria-label="Open menu"
        >
          <img src={burgerIcon} alt="" />
        </button>
      </div>

      {isBurgerOpen && (
        <div className={styles.burgerMenu}>
          <div className={styles.burger_header}>
            <Logo />
            <button
              className={styles.close_button}
              onClick={closeBurger}
              aria-label="Close menu"
            >
              <img src={closeIcon} alt="Close" />
            </button>
          </div>

          <HeaderNavItems
            className={styles.burgerNav}
            onLinkClick={closeBurger}
          />

          <FavoriteAndCart
            className={styles.burgerFavAndCartIcons}
            isBurger
            onLinkClick={closeBurger}
            cartCount={totalQuantity}
            favCount={totalFavorites}
          />
        </div>
      )}
    </header>
  );
};
