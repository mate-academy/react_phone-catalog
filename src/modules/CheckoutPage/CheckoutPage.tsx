/* eslint-disable max-len */
import { useEffect } from 'react';
import { CheckoutOrderInfo } from './CheckoutOrderInfo';
import { CheckoutInfo } from './CustomerInfoBlocks/CheckOutInfo';
import { ContactInfo } from './CustomerInfoBlocks/ContactInfo';
import { DeliveryInfo } from './CustomerInfoBlocks/DeliveryInfo';
import { GoBackButton } from '../shared/Shared_Components/ActionButtons/GoBackButton';
import { scrollToTop } from '../../utils/scrollToTop';

export const CheckoutPage = () => {
  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <div className="container">
      <GoBackButton />

      <div className="checkout">
        <div className="checkout__data-block">
          <ContactInfo />

          <DeliveryInfo />

          <CheckoutInfo />
        </div>

        <CheckoutOrderInfo />
      </div>
    </div>
  );
};
