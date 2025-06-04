/* eslint-disable max-len */
import { useContext, useEffect } from 'react';
import { CheckoutOrderInfo } from './CheckoutOrderInfo';
import { CheckoutInfo } from './CustomerInfoBlocks/CheckOutInfo';
import { ContactInfo } from './CustomerInfoBlocks/ContactInfo';
import { DeliveryInfo } from './CustomerInfoBlocks/DeliveryInfo';
import { GoBackButton } from '../shared/Shared_Components/ActionButtons/GoBackButton';
import { scrollToTop } from '../../utils/scrollToTop';
import classNames from 'classnames';
import { DarkModeContext } from '../../Store/StoreThemeMode';

export const CheckoutPage = () => {
  const { isDark } = useContext(DarkModeContext);

  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <div className="container">
      <GoBackButton />

      <div
        className={classNames('checkout', {
          'checkout--dark': isDark,
        })}
      >
        <div
          className={classNames('checkout__data-block', {
            'checkout__data-block--dark': isDark,
          })}
        >
          <ContactInfo />

          <DeliveryInfo />

          <CheckoutInfo />
        </div>

        <CheckoutOrderInfo />
      </div>
    </div>
  );
};
