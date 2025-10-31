import { ArrowIcon } from '@shared/icons';
import styles from './deliveryForm.module.scss';
import { useState } from 'react';

enum DeliveryMethods {
  ND = 'In-store pickup',
  COURIER = 'Courier',
  REG = 'Regular shipping',
}

export const DeliveryForm = () => {
  const [delivery, setDelivery] = useState<DeliveryMethods>(DeliveryMethods.ND);

  return (
    <fieldset className={styles.main}>
      <legend className={styles.h3}>Shipping details</legend>
      <label htmlFor="deliveryMethod">Delivery method</label>
      <div className={styles['select-wrapper']}>
        <select name="deliveryMethod" id="deliveryMethod" required>
          {Object.values(DeliveryMethods).map(el => (
            <option key={el}>{el}</option>
          ))}
        </select>
        <ArrowIcon direction="down" />
      </div>
      <div className={styles['input-wrapper']}>
        <label htmlFor="street">street</label>
        <input type="text" id="street" name="street" required />
      </div>
      <div className={styles['input-wrapper']}>
        <label htmlFor="number">number</label>
        <input type="text" id="number" name="number" required />
      </div>
      <div className={styles['input-wrapper']}>
        <label htmlFor="zip">ZIP/Postal code</label>
        <input type="text" id="zip" name="zip" required />
      </div>
      <div className={styles['input-wrapper']}>
        <label htmlFor="city">city</label>
        <input type="email" id="city" name="city" required />
      </div>
      <div className={styles['select-wrapper']}>
        <label htmlFor="country">country</label>
        <select name="country" id="country" required></select>
        <ArrowIcon direction="down" />
      </div>
    </fieldset>
  );
};
