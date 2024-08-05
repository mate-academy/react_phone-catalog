import React from 'react';
import { CartItem } from './CartItem/CartItem';
import styles from './CartItems.module.scss';
import { Product } from '../../../../utils/types/Product';

type Props = {
  products: Product[];
};

export const CartItems: React.FC<Props> = ({ products }) => {
  return (
    <div className={styles.cartItems}>
      <div className={styles.cartItems__wrapper}>
        {products.map(product => (
          <CartItem key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};
