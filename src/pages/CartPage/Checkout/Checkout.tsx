import { CartItems } from './CartItems/CartItems';
import { CheckoutInformation } from './CheckoutInformation/CheckoutInformation';
import styles from './Checkout.module.scss';
import React from 'react';
import { Product } from '../../../utils/types/Product';

type Props = {
  products: Product[];
};

export const Checkout: React.FC<Props> = ({ products }) => {
  return (
    <div className={styles.checkout}>
      <div className={styles.checkout__wrapper}>
        <CartItems products={products} />
        <CheckoutInformation />
      </div>
    </div>
  );
};
