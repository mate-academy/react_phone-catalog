import React, { memo } from 'react';
import BackButton from '../../components/UI/buttons/BackButton';

import './CartPage.scss';
import CartList from '../../components/common/CartList';
import CartSummary from '../../components/common/CartSummary';
import { useAppSelector } from '../../store/redux/hooks';
import { cartSelector } from '../../store/redux/slices/cartSlice';
import ErrorMessage from '../../components/common/ErrorMessage';

export const CartPage: React.FC = memo(() => {
  const error = useAppSelector(cartSelector.selectError);
  const cartIsEmpty = useAppSelector(cartSelector.selectEmptyList);

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (cartIsEmpty) {
    return (
      <div className="cart-page--empty">
        <img src="./img/icons/shopping-bag-icon.svg" alt="" />

        <p className="cart-page--empty__message">
          Your cart is empty
        </p>

        <p className="cart-page--empty__description">
          Looks like you have not added anything to you cart. Go ahead and explore top categories.
        </p>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <BackButton />

      <h1 className="cart-page__title">Cart</h1>

      <div className="cart-page__content">
        <CartList />

        <CartSummary />
      </div>
    </div>
  );
});
