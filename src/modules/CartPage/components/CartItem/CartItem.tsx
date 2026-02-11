import React from 'react';
import styles from './CartItem.module.scss';
import { CartProduct } from '../../../../types/cartProduct';
import { Link } from 'react-router-dom';
import { getAssetUrl } from '../../../../api/utilis';
import { useAppContext } from '../../../../hooks/useAppContext';
import { themeIconRemoveProduct } from '../../../../utils/iconsTheme';

type CartItemProps = {
  product: CartProduct;
  index: number;
  handleRemoveProduct: (index: number) => void;
  handleQuantity: (type: 'increase' | 'decrease', index: number) => void;
};

export const CartItem = ({
  product,
  index,
  handleRemoveProduct,
  handleQuantity,
}: CartItemProps) => {
  const { state } = useAppContext();

  const totalPrice = product.product.price * product.quantity;

  return (
    <div key={product.id} className={styles.product}>
      <div className={styles.product__item}>
        <button
          onClick={() => handleRemoveProduct(index)}
          className={styles.buttonRemove}
          aria-label="remove product from basket"
        >
          <img
            className={styles.buttonRemove__item}
            src={themeIconRemoveProduct(state.theme)}
            alt=""
            aria-hidden={true}
          />
        </button>
        <Link
          to={`/product/${product.id}`}
          state={{ category: product.product.category }}
          className={styles.image}
        >
          <img
            className={styles.image__item}
            src={product.product.image}
            alt={`image of ${product.product.name}`}
          />
        </Link>
        <Link
          to={`/product/${product.id}`}
          state={{ category: product.product.category }}
          className={styles.text}
        >
          {product.product.name}
        </Link>
      </div>
      <div className={styles.product__options}>
        <div className={styles.productQuantity}>
          <button
            onClick={() => handleQuantity('decrease', index)}
            className={styles.productQuantity__button}
            aria-label="decrease quantity"
            disabled={product.quantity === 1}
          >
            <img
              src={
                product.quantity === 1
                  ? getAssetUrl('icons/minus_disabled.svg')
                  : getAssetUrl('icons/minus.svg')
              }
              alt=""
              aria-hidden={true}
            />
          </button>
          <p className={styles.productQuantity__value}>{product.quantity}</p>
          <button
            onClick={() => handleQuantity('increase', index)}
            className={styles.productQuantity__button}
            aria-label="increase quantity"
          >
            <img
              src={getAssetUrl('icons/plus.svg')}
              alt=""
              aria-hidden={true}
            />
          </button>
        </div>
        <p className={styles.price}>{`$${totalPrice}`}</p>
      </div>
    </div>
  );
};
