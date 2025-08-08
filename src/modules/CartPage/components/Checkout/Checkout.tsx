import React from 'react';
import cn from 'classnames';
import checkoutClass from './checkout.module.scss';
import { Button } from '../../../shared/components/Button';

type Props = {
  totalPrice: number;
  cartLength: number;
};

export const Checkout: React.FC<Props> = React.memo(
  ({ totalPrice, cartLength }) => {
    return (
      <div className={cn(checkoutClass.checkout)}>
        <div className={cn(checkoutClass['checkout__text-content'])}>
          <p className={cn(checkoutClass['checkout__total-price'])}>
            ${totalPrice}
          </p>
          <p className={cn(checkoutClass.checkout__text)}>
            Total for {cartLength} items
          </p>
        </div>
        <div className={cn(checkoutClass.checkout__button)}>
          <Button text={'Checkout'} />
        </div>
      </div>
    );
  },
);

Checkout.displayName = 'Checkout';
