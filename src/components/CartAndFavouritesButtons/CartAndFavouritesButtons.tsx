import classNames from 'classnames';
import React, { useMemo } from 'react';
import { NavLink } from 'react-router-dom';
import { useCart } from '../../store/CartContext';
import { useFavourites } from '../../store/FavouritesContext';
import styles from './CartAndFavouritesButtons.module.scss';

interface Props {
  variant: string;
  onLinkClick?: () => void;
}

export const CartAndFavouritesButtons: React.FC<Props> = ({
  variant,
  onLinkClick,
}) => {
  const { state: cartState } = useCart();
  const { state: favouritesState } = useFavourites();
  const cartQuantity = useMemo(() => {
    return cartState.products.reduce((a, c) => {
      if (!c.quantity) {
        return 0;
      }

      return a + c.quantity;
    }, 0);
  }, [cartState.products]);
  const favouritesQuantity = useMemo(
    () => favouritesState.products.length,
    [favouritesState.products],
  );

  return (
    <ul
      className={classNames(styles.buttons, {
        [styles['buttons--header']]: variant === 'header',
        [styles['buttons--menu']]: variant === 'menu',
      })}
    >
      <li className={styles.button}>
        <NavLink
          to="favourites"
          onClick={onLinkClick}
          className={({ isActive }) =>
            classNames(styles.button__link, {
              [styles.active]: isActive,
            })
          }
          aria-label="open favourites"
        >
          <div
            className={classNames(
              styles.button__img,
              styles['button__img--favourites'],
            )}
          >
            {favouritesQuantity > 0 && (
              <span className={styles.button__span}>
                <p className={styles.button__quantity}>{favouritesQuantity}</p>
              </span>
            )}
          </div>
        </NavLink>
      </li>

      <li className={styles.button}>
        <NavLink
          to="cart"
          onClick={onLinkClick}
          className={({ isActive }) =>
            classNames(styles.button__link, {
              [styles.active]: isActive,
            })
          }
          aria-label="open card"
        >
          <div
            className={classNames(
              styles.button__img,
              styles['button__img--cart'],
            )}
          >
            {cartQuantity > 0 && (
              <span className={styles.button__span}>
                <p className={styles.button__quantity}>{cartQuantity}</p>
              </span>
            )}
          </div>
        </NavLink>
      </li>
    </ul>
  );
};
