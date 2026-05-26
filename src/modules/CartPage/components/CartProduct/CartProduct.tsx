import { FC } from 'react';
import { Link } from 'react-router-dom';

import { CartItem, useCart } from '../../../shared/context/CartContext';
import { Icon } from '../../../shared/components/Icon/Icon';
import { IconButton } from '../../../shared/components/IconButton';

import styles from './CartProduct.module.scss';

type Props = {
  product: CartItem;
};

export const CartProduct: FC<Props> = ({ product }) => {
  const { removeFromCart, changeQuantity } = useCart();

  return (
    <article className={styles['cart-product']}>
      <div className={styles['cart-product__info']}>
        <button
          className={styles['cart-product__button']}
          onClick={() => removeFromCart(product.itemId)}
        >
          <Icon name="close" className={styles['cart-product__icon-close']} />
        </button>

        <Link
          to={`/${product.category}/${product.itemId}`}
          className={styles['cart-product__link']}
        >
          <img
            className={styles['cart-product__image']}
            src={product.image}
            alt={product.name}
          />
        </Link>

        <Link
          className={styles['cart-product__title']}
          to={`/${product.category}/${product.itemId}`}
        >
          {product.name}
        </Link>
      </div>

      <div className={styles['cart-product__controls']}>
        <div className={styles['cart-product__buttons']}>
          <IconButton
            icon="minus"
            onClick={() => changeQuantity(product.itemId, product.quantity - 1)}
            disabled={product.quantity === 1}
          />

          <div className={styles['cart-product__count']}>
            {product.quantity}
          </div>

          <IconButton
            icon="plus"
            onClick={() => changeQuantity(product.itemId, product.quantity + 1)}
          />
        </div>

        <span className={styles['cart-product__price']}>
          ${product.price * product.quantity}
        </span>
      </div>
    </article>
  );
};
