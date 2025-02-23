import classNames from 'classnames';
import React, { useMemo } from 'react';
import { NavLink } from 'react-router-dom';
import { useCart } from '../../store/CartContext';
import styles from './CartAndFavouritesButtons.module.scss';

interface Props {
  variant: string;
  onLinkClick?: () => void;
}

export const CartAndFavouritesButtons: React.FC<Props> = ({
  variant,
  onLinkClick,
}) => {
  const { state } = useCart();
  const cartQuantity = useMemo(() => {
    return state.products.reduce((a, c) => {
      if (!c.quantity) {
        return 0;
      }

      return a + c.quantity;
    }, 0);
  }, [state.products]);

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
        >
          <div
            className={classNames(
              styles.button__img,
              styles['button__img--favourites'],
            )}
          >
            {/*cartQuantity > 0 && <span className={styles.button__quantity}>{cartQuantity}</span>*/}
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
        >
          <div
            className={classNames(
              styles.button__img,
              styles['button__img--cart'],
            )}
          >
            {cartQuantity > 0 && (
              <span className={styles.button__quantity}>{cartQuantity}</span>
            )}
          </div>
        </NavLink>
      </li>
    </ul>
  );
};
