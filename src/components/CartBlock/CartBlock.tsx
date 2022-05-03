import React from 'react';
import { useSelector } from 'react-redux';
import { CartProduct } from '../CartProduct';
import { Order } from '../Order';
import { getCartGoods } from '../../store';
import { NoSelected } from '../NoSelected';
import './CartBlock.scss';

export const CartBlock = () => {
  const cartGoods = useSelector(getCartGoods);

  if (!cartGoods.length) {
    return <NoSelected />;
  }

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
