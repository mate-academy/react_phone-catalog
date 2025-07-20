import type { FC } from 'react';
import { CartCard } from '../../Cart/CartCard';
import styles from './CartListSection.module.scss';
import type { Product } from '../../../types/product';

export interface CartProduct extends Product {
  quantity: number;
}

interface CartListSectionProps {
  productsInCart: CartProduct[];
  onRemove: (id: string) => void;
}

export const CartListSection: FC<CartListSectionProps> = ({
  productsInCart,
  onRemove,
}) => {
  return (
    <section className={styles.cartList}>
      {productsInCart.length > 0 ?
        productsInCart.map((product) => (
          <CartCard
            key={product.id}
            item={product}
            onRemove={() => onRemove(product.id)}
          />
        ))
      : <p className={styles.emptyCartMessage}>Your cart is empty.</p>}
    </section>
  );
};
