import React, { useContext, useState } from 'react';
import classNames from 'classnames';
import styles from './CartProduct.module.scss';
import icons from '../../assets/icons/icons.svg';
import { ProductsContext } from '../../store/ProductsContext';
import { CartProducts } from '../../types/CartProduct';
import { Link } from 'react-router-dom';

type CartProductProps = {
  product: CartProducts;
};

export const CartProd: React.FC<CartProductProps> = ({ product }) => {
  const { SetUpdateQuantity, SetRemoveFromCart } = useContext(ProductsContext);
  const [isRemoving, setIsRemoving] = useState(false);

  const handleRemove = (id: string) => {
    setIsRemoving(true);

    setTimeout(() => {
      SetRemoveFromCart(id);
    }, 500);
  };

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity < 1) {
      return;
    }

    SetUpdateQuantity(id, newQuantity);
  };

  const increaseQuantity = (id: string, quantity: number) => {
    handleQuantityChange(id, quantity + 1);
  };

  const decreaseQuantity = (id: string, quantity: number) => {
    if (quantity > 1) {
      handleQuantityChange(id, quantity - 1);
    }
  };

  return (
    <li
      className={classNames(styles.cartItem, {
        [styles.removing]: isRemoving,
      })}
      key={product.id}
    >
      <div className={styles.cartItemDetails}>
        <div className={styles.itemWrapper}>
          <button
            className={styles.cartItemRemove}
            onClick={() => handleRemove(product.id)}
          >
            <svg>
              <use href={`${icons}#icon-close-menu`}></use>
            </svg>
          </button>
          <Link
            to={`/${product.category}/${product.itemId}`}
            className={styles.imageWrapper}
          >
            <img src={product.image} alt={product.name} />
          </Link>
          <h3 className={styles.cartItemName}>{product.name}</h3>
        </div>

        <div className={styles.priceQuantityWrapper}>
          <div className={styles.cartItemControls}>
            <button
              className={classNames(styles.cartItemControlButton, {
                [styles.disabled]: product.quantity === 1,
              })}
              onClick={() => decreaseQuantity(product.id, product.quantity)}
              disabled={product.quantity === 1}
            >
              -
            </button>
            <p className={styles.cartItemQuantity}>{product.quantity}</p>
            <button
              className={styles.cartItemControlButton}
              onClick={() => increaseQuantity(product.id, product.quantity)}
            >
              +
            </button>
          </div>
          <p className={styles.cartItemPrice}>
            ${product.price * product.quantity}
          </p>
        </div>
      </div>
    </li>
  );
};
