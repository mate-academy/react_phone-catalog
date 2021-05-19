import React from 'react';
import { useSelector } from 'react-redux';
import { CartProduct } from '../CartProduct/CartProduct';
import { Order } from '../Order/Order';
import { getCartGoods } from '../../../../store/store';
import './CartBlock.scss';

export const CartBlock = () => {
  const cartGoods = useSelector(getCartGoods);

  return (
    <section className="Cart Main-Cart">
      <div className="Cart-Products">
        {cartGoods.map(product => (
          <CartProduct key={product.id} product={product} />
        ))}
      </div>
      <Order />
    </section>
  );
};
