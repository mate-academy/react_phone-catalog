import React from 'react';
import './CartList.scss';
import { getUniqueId } from '../../helpers/getFunctions/getUniqueld';
import { CartCard } from '../CartCard';
import { CartProduct } from '../../types/CartProduct';

type Props = {
  products: CartProduct[]
};

export const CartList: React.FC<Props> = ({ products }) => (
  <ul className="cart-list">
    {products.map(product => (
      <li
        key={getUniqueId()}
        className="cart-list__item"
      >
        <CartCard product={product} />
      </li>
    ))}
  </ul>
);
