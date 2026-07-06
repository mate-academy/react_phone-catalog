//#region imports
import { FC } from 'react';
import { CartItem as Item } from '../../../shared/types/CartItem';
import { CartItem } from '../CartItem';
import baseStyles from './base.module.scss';
//#endregion

type Props = {
  cartItems: Item[];
};

export const CartList: FC<Props> = ({ cartItems }) => (
  <ul className={baseStyles.cartList}>
    {cartItems.map(cartItem => (
      <li key={cartItem.id}>
        <CartItem cartItem={cartItem} />
      </li>
    ))}
  </ul>
);
