import React from 'react';
import { Product } from '../../../api/products';
import { useCart } from '../../../modules/shared/context/CartContext';
import classNames from 'classnames';
import styles from './AddToCartBtn.module.scss';
interface Props {
  product: Product;
  className?: string;
}

export const AddToCartBtn: React.FC<Props> = ({ product, className }) => {
  const { items, add } = useCart();
  const inCart = items.some(i => i.id === product.id);

  return (
    <button
      type="button"
      onClick={() => add(product)}
      disabled={inCart}
      className={classNames(styles.button, className, {
        [styles['button--active']]: inCart,
      })}
    >
      {inCart ? 'Added to cart' : 'Add to cart'}
    </button>
  );
};
