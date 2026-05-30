import React from 'react';
import styles from './CartList.module.scss';
import { CartItem } from '../CartItem';
import { CartItemType } from '../../../../types/CartItem';

interface Props {
  products: CartItemType[];
}

export const CartList: React.FC<Props> = ({ products }) => {
  return (
    <div className={styles.cartList}>
      {products.map(product => (
        <CartItem key={product.itemId} product={product} />
      ))}
    </div>
  );
};
