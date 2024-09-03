/* eslint-disable max-len */
import styles from './NavigationIcons.module.scss';
import { NavLink } from 'react-router-dom';
import { FavouritesIcon } from '../../../../components/Icons/FavouritesIcon';
import { CartIcon } from '../../../../components/Icons/CartIcon';
import classNames from 'classnames';
import { useFavouriteProducts } from '../../../../store/FavouriteProductsContext';
import { useShoppingCart } from '../../../../store/CartContext';

type Props = {
  onClose?: () => void;
};

export const NavigationIcons: React.FC<Props> = ({ onClose = () => {} }) => {
  const getLinkClassIcon = ({ isActive }: { isActive: boolean }) =>
    classNames(styles.nav__icon, {
      [styles.nav__isActive]: isActive,
    });

  const { favouriteProducts } = useFavouriteProducts();
  const { totalQuantity } = useShoppingCart();

  return (
    <>
      <NavLink to="favourites" className={getLinkClassIcon} onClick={onClose}>
        <FavouritesIcon />
        {favouriteProducts.length > 0 && (
          <div className={styles.nav__iconCounter}>
            {favouriteProducts.length}
          </div>
        )}
      </NavLink>
      <NavLink to="cart" className={getLinkClassIcon} onClick={onClose}>
        <CartIcon />
        {totalQuantity > 0 && (
          <div className={styles.nav__iconCounter}>{totalQuantity}</div>
        )}
      </NavLink>
    </>
  );
};
