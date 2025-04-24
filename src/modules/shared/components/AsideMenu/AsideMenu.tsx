import { Icon } from '../Icon/Icon';
import { Logo } from '../Logo';
import { Menu } from '../Menu';
import styles from './AsideMenu.module.scss';
import { IconType } from '../../types/IconType';
import { useCart } from '../../../../store/CartContext';
import { useFavorites } from '../../../../store/FavoriteContext';

export const AsideMenu = () => {
  const { totalCardQuantity } = useCart();
  const { totalFavQuantity } = useFavorites();

  return (
    <div className={styles.aside__container}>
      <div className={styles.aside__top}>
        <div className={styles.aside__logo_container}>
          <Logo />
        </div>
        <div
          className={`${styles.aside__icon_container} ${styles[`aside__icon_container--close`]}`}
        >
          <Icon iconType={IconType.Close} address="#" />
        </div>
      </div>
      <Menu />
      <div className={styles.aside__icons}>
        <div className={styles.aside__icon_container}>
          <Icon
            iconType={IconType.Like}
            address="favorites"
            contentFav={totalFavQuantity}
          />
        </div>
        <div className={styles.aside__icon_container}>
          <Icon
            iconType={IconType.Cart}
            address="cart"
            contentCart={totalCardQuantity}
          />
        </div>
      </div>
    </div>
  );
};
