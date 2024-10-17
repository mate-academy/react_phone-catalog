import { FC } from 'react';

import cartEmpty from '/img/cart/cart-is-empty.png';

import styles from './CartEmpty.module.scss';

export const CartEmpty: FC = () => (
  <section className={styles.cartEmpty}>
    <img src={cartEmpty} alt="Cart is empty" />
  </section>
);
