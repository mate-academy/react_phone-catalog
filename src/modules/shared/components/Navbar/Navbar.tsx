import styles from './Navbar.module.scss';
import { useCart } from '../../../../store/CartContext';
import { useFavorites } from '../../../../store/FavoriteContext';
import { IconType } from '../../types/IconType';
import { Logo } from '../Logo';
import { Menu } from '../Menu';
import { NavbarIcon } from '../NavbarIcon/NavbarIcon';
import { Search } from '../Search';

interface NavbarProps {
  showSearch: boolean;
}

export const Navbar = ({ showSearch }: NavbarProps) => {
  const { totalCardQuantity } = useCart();
  const { totalFavQuantity } = useFavorites();

  return (
    <div className={styles.navbar__container}>
      <div className={styles.navbar__menu_container}>
        <div className={styles.navbar__logo_container}>
          <Logo />
        </div>

        <div className={styles.navbar__menu}>
          <Menu />
        </div>
      </div>

      {showSearch && <Search />}

      <div className={styles.navbar__icons}>
        <NavbarIcon
          iconType={IconType.Menu}
          containerType="menu"
          iconAddress="#menu"
        />

        <NavbarIcon
          iconType={IconType.Like}
          iconAddress="favorites"
          containerType="like"
          contentFav={totalFavQuantity}
        />
        <NavbarIcon
          iconType={IconType.Cart}
          iconAddress="cart"
          containerType="cart"
          contentCart={totalCardQuantity}
        />
      </div>
    </div>
  );
};
