import React from 'react';
import { Icon } from '../../../../components/Icon';
import { CartItem as CartItemType } from '../../../shared/types/Product';
import styles from './CartItem.module.scss';
import { Button } from '../../../../components/Button';
import { useCart } from '../../../shared/context/CartContext';
import classNames from 'classnames';
import { getPublicPath } from '../../../shared/utils/pathHelper';
import { Link } from 'react-router-dom';

interface Props {
  cartItem: CartItemType;
}

export const CartItem: React.FC<Props> = ({ cartItem }) => {
  const { increaseQuantity, decreaseQuantity, deleteFromCart } = useCart();

  const totalPrice = cartItem.price * cartItem.quantity;

  return (
    <article className={styles.cartItem}>
      <Button
        variant="secondary"
        className={styles.buttonDelete}
        onClick={() => deleteFromCart(cartItem.id)}
        aria-label="Remove item"
      >
        <Icon variant="close" />
      </Button>

      <Link to={`/${cartItem.category}/${cartItem.itemId}`} className={styles.productLink}>
        <div className={styles.imageWrapper}>
          <img
            src={getPublicPath(`/${cartItem.image}`)}
            alt={cartItem.name}
            className={styles.image}
          />
        </div>
        <p className={classNames(styles.name, 'body-text')}>{cartItem.name}</p>
      </Link>

      <div className={styles.counterBlock}>
        <Button
          variant="slider"
          onClick={() => decreaseQuantity(cartItem.id)}
          disabled={cartItem.quantity === 1}
        >
          <Icon variant="minus" />
        </Button>
        <span className="body-text">{cartItem.quantity}</span>
        <Button variant="slider" onClick={() => increaseQuantity(cartItem.id)}>
          <Icon variant="plus" />
        </Button>
      </div>

      <h3 className={styles.price}>{`$${totalPrice}`}</h3>
    </article>
  );
};
