import { useState } from 'react';

import { clearCart } from '../../features/cart/cartSlice';

import { useAppDispatch, useAppSelector } from '../../hooks';

import { ButtonPrimary } from '../ButtonPrimary';

import styles from './TotalAmount.module.scss';
const {
  total,
  total__priceBlock,
  total__price,
  total__amount,
  total__line,
  total__checkoutWindow,
  total__checkoutText,
  total__checkoutButtonWrapper,
} = styles;

export const Total = () => {
  const dispatch = useAppDispatch();

  const { cartItems } = useAppSelector((state) => state.cart);
  const [checkoutIsVisible, setCheckoutIsVisible] = useState(false);

  const totalCost = cartItems.reduce(
    (total, current) => total + current.product.fullPrice * current.quantity,
    0,
  );
  const totalProducts = cartItems.reduce(
    (totalAmount, current) => totalAmount + current.quantity,
    0,
  );

  return (
    <div className={total}>
      {!checkoutIsVisible ? (
        <>
          <div className={total__priceBlock}>
            <h1 className={total__price}>{`$${totalCost}`}</h1>

            <p className={total__amount}>
              {`Total for ${totalProducts} ${totalProducts > 1 ? 'items' : 'item'}`}
            </p>
          </div>
          <div className={total__line} />
          <ButtonPrimary
            buttonText="Checkout"
            action={() => setCheckoutIsVisible(!checkoutIsVisible)}
            disabled={false}
            additionalStyles={{ fontWeight: '600' }}
          />
        </>
      ) : (
        <div className={total__checkoutWindow}>
          <p className={total__checkoutText}>
            Checkout is not implemented yet. Do you want to clear the Cart?
          </p>

          <div className={total__checkoutButtonWrapper}>
            <ButtonPrimary
              buttonText="Yes, confirm"
              disabled={false}
              action={() => dispatch(clearCart())}
              additionalStyles={{ padding: '7px', flexGrow: 1 }}
            />

            <ButtonPrimary
              buttonText="Cancel"
              disabled={false}
              action={() => setCheckoutIsVisible(!checkoutIsVisible)}
              additionalStyles={{
                padding: '7px',
                flexGrow: 1,
                backgroundColor: '#E2E6E9',
                borderColor: '#E2E6E9',
                color: '#89939A',
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};
