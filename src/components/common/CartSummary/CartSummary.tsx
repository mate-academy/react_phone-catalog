import React, { useMemo } from 'react';
import { useAppSelector } from '../../../store/redux/hooks';
import { cartSelector } from '../../../store/redux/slices/cartSlice';

import './CartSummary.scss';

export const CartSummary: React.FC = () => {
  const { storageProducts, products } = useAppSelector(cartSelector.selectState);

  const [totalPrice, totalCount] = useMemo(() => {
    return storageProducts.reduce((acc, storageProduct) => {
      const thisProduct = products.find(product => product.itemId === storageProduct.id) ?? {
        price: 0,
      };

      return [
        acc[0] + storageProduct.amount * thisProduct.price,
        acc[1] + storageProduct.amount,
      ];
    }, [0, 0]);
  }, [storageProducts, products]);

  return (
    <section className="cart-summary">
      <p className='cart-summary__total-price'>${totalPrice}</p>
      <p className='cart-summary__total'>Total for {totalCount} items</p>

      <hr />

      <button
        onClick={() => {}}
        className='cart-summary__checkout'
      >
        Checkout
      </button>
    </section>
  );
};
