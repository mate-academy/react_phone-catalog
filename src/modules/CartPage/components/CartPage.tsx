/* eslint-disable max-len */
import React, { useContext, useEffect } from 'react';
import { AnimatedLayout } from '../../shared/Shared_Components/AnimatedComponents/AnimatedLayout';
import { CartStoreContext } from '../../../Store/CartStore';
import { CartList } from './CartList';
import { CartCheckout } from './CartCheckout';
import { GoBackButton } from '../../shared/Shared_Components/ActionButtons/GoBackButton';
import { scrollToTop } from '../../../utils/scrollToTop';
import classNames from 'classnames';
import { DarkModeContext } from '../../../Store/StoreThemeMode';

export const CartPage: React.FC = () => {
  const { cartList } = useContext(CartStoreContext);
  const { isDark } = useContext(DarkModeContext);

  useEffect(() => {
    scrollToTop();
  });

  return (
    <AnimatedLayout>
      <div className="container cart">
        <div className="cart__top">
          <GoBackButton />

          <h1
            className={classNames('title title--h1', {
              'title--is-Dark': isDark,
            })}
          >
            Cart
          </h1>
        </div>

        {cartList.length ? (
          <div className="cart__body">
            <CartList cartList={cartList} />

            <CartCheckout />
          </div>
        ) : (
          <div className="cart__empty">
            <h2
              className={classNames('title title--h2', {
                'title--is-Dark': isDark,
              })}
            >
              Your cart is empty
            </h2>

            <div className="cart__cat-image" />
          </div>
        )}
      </div>
    </AnimatedLayout>
  );
};
