export * from './MobileMenu';

import { NavLink } from 'react-router-dom';

import styles from './MobileMenu.module.scss';

import { FavoriteIcon } from '../Icons/FavoriteIcon';
import { CartIcon } from '../Icons/CartIcon/CartIcon';
import { useCart, useFavorites } from '../../hooks';

type MobileMenuProps = {
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const MobileMenu = ({ setIsMenuOpen }: MobileMenuProps) => {
  const { favoriteIds } = useFavorites();
  const { cartIds } = useCart();

  return (
    <aside className={styles.menu}>
      <div className={styles.menu__pages}>
        <NavLink
          to="/"
          onClick={() => {
            setIsMenuOpen(false);
          }}
        >
          home
        </NavLink>
        <NavLink
          to="/phones"
          onClick={() => {
            setIsMenuOpen(false);
          }}
        >
          phone
        </NavLink>
        <NavLink
          to="/tablets"
          onClick={() => {
            setIsMenuOpen(false);
          }}
        >
          tablets
        </NavLink>
        <NavLink
          to="/accessories"
          onClick={() => {
            setIsMenuOpen(false);
          }}
        >
          accessories
        </NavLink>
      </div>

      <div className={styles.menu__footer}>
        <FavoriteIcon
          className={styles.footerIcon}
          favorites={favoriteIds.length}
          onClick={() => setIsMenuOpen(false)}
        />

        <CartIcon
          className={styles.footerIcon}
          cartItens={cartIds.length}
          onClick={() => setIsMenuOpen(false)}
        />
      </div>
    </aside>
  );
};
