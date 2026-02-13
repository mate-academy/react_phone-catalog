import React from 'react';
import cn from 'classnames';
import checkoutClass from './checkout.module.scss';
import { Button } from '../../../shared/components/Button';

type Props = {
  totalPrice: number;
  totalItems: number;
};

export const Checkout: React.FC<Props> = React.memo(
  ({ totalPrice, totalItems }) => {
    return (
      <div className={cn(checkoutClass.checkout)}>
        <div className={cn(checkoutClass['checkout__text-content'])}>
          <p className={cn(checkoutClass['checkout__total-price'])}>
            ${totalPrice}
          </p>
          <p className={cn(checkoutClass.checkout__text)}>
            Total for {totalItems} items
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
