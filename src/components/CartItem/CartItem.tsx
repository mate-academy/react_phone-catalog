import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import styles from './CartItem.module.scss';
import { CartContext } from '../../store/CartContext';
import { ThemeContext } from '../../store/ThemeContex';
import { ProductInCart } from '../../types/ProductInCart';
import { Theme } from '../../types/Theme';
import cross from '../../images/icons/close.svg';
import plus from '../../images/icons/plus.svg';
import plus_dark from '../../images/icons/plus_for_dark.svg';
import minus from '../../images/icons/minus.svg';
import minus_dark from '../../images/icons/minus_for_dark.svg';
import minus_dis from '../../images/icons/Vector (Stroke).svg';

type Props = {
  cartProduct: ProductInCart;
};

export const CartItem: React.FC<Props> = ({ cartProduct }) => {
  const { image, name, price, category, itemId } = cartProduct.product;
  const { quantity } = cartProduct;
  const { removeFromCart, increaseQuantity, decreaseQuantity } =
    useContext(CartContext);
  const { theme } = useContext(ThemeContext);

  return (
    <div
      className={cn({
        [styles.item]: theme === Theme.Light,
        [styles['item--dark']]: theme === Theme.Dark,
      })}
    >
      <div className={styles.item__top}>
        <button
          className={styles['item__button-cross']}
          onClick={() => removeFromCart(itemId)}
        >
          <img src={cross} alt="Close" className={styles.item__image} />
        </button>

        <div className={styles['item__img-container']}>
          <img src={image} className={styles.item__image} />
        </div>

        <Link
          to={`/${category}/${itemId}`}
          className={cn({
            [styles.item__name]: theme === Theme.Light,
            [styles['item__name-dark']]: theme === Theme.Dark,
          })}
        >
          {name}
        </Link>
      </div>

      <div className={styles.item__bottom}>
        <div className={styles['item__quantity-block']}>
          <button
            className={cn({
              [styles['item__button-count']]: theme === Theme.Light,
              [styles['item__button-count-dark']]: theme === Theme.Dark,
            })}
            onClick={() => decreaseQuantity(itemId)}
          >
            <img
              src={
                quantity === 1
                  ? minus_dis
                  : theme === Theme.Light
                    ? minus
                    : minus_dark
              }
              alt="minus"
              className={styles.item__img}
            />
          </button>
          <p
            className={cn({
              [styles.item__quantity]: theme === Theme.Light,
              [styles['item__quantity-dark']]: theme === Theme.Dark,
            })}
          >
            {quantity}
          </p>
          <button
            onClick={() => increaseQuantity(itemId)}
            className={cn({
              [styles['item__button-count']]: theme === Theme.Light,
              [styles['item__button-count-dark']]: theme === Theme.Dark,
            })}
          >
            <img
              src={theme === Theme.Light ? plus : plus_dark}
              alt="plus"
              className={styles.item__img}
            />
          </button>
        </div>

        <div
          className={cn({
            [styles.item__price]: theme === Theme.Light,
            [styles['item__price-dark']]: theme === Theme.Dark,
          })}
        >
          {`$${price * quantity}`}
        </div>
      </div>
    </div>
  );
};
