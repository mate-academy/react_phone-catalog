/* eslint-disable max-len */
import React, { useContext, useEffect } from 'react';
import { AnimatedLayout } from '../../shared/Shared_Components/AnimatedComponents/AnimatedLayout';
import { CartStoreContext } from '../../../Store/CartStore';
import { CartList } from './CartList';
import { CartCheckout } from './CartCheckout';
import { GoBackButton } from '../../shared/Shared_Components/ActionButtons/GoBackButton';
import { scrollToTop } from '../../../utils/scrollToTop';

export const CartPage: React.FC = () => {
  const { cartList } = useContext(CartStoreContext);

  useEffect(() => {
    scrollToTop();
  });

  return (
    <AnimatedLayout>
      <div className="container cart">
        <div className="cart__top">
          <GoBackButton />

          <h1 className="title title--h1">Cart</h1>
        </div>

        {cartList.length ? (
          <div className="cart__body">
            <CartList cartList={cartList} />

            <CartCheckout />
          </div>
        ) : (
          <div className="cart__empty">
            <h2 className="title title--h2">Your cart is empty</h2>

            <div className="cart__cat-image" />
          </div>
        )}
      </div>
    </AnimatedLayout>
  );
};
