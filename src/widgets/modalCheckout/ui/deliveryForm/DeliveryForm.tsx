import { ArrowIcon } from '@shared/icons';
import styles from './deliveryForm.module.scss';
import { useCheckout } from '@widgets/modalCheckout/model';
import { DeliveryTypes } from '@shared/api/types/bodies.enums';
import { useState } from 'react';
import { DeliveryDetails } from './deliveryDetails/DeliveryDetails';

export const DeliveryForm = () => {
  const { deliveryType } = useCheckout();
  const [tick, setTick] = useState<boolean>(false);

  const uiToData: Record<string, DeliveryTypes> = {
    'In store pickup': DeliveryTypes.PICKUP,
    'DPD express': DeliveryTypes.DPD,
    'UPS standart': DeliveryTypes.UPS,
  };

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    deliveryType.current = uiToData[e.target.value];
    setTick(!tick);
  };

  return (
    <fieldset className={styles['form-container']}>
      <legend className={styles.heading}>shipping details</legend>
      <label htmlFor="deliveryType">delivery method</label>
      <div className={styles['select-wrapper']}>
        <select
          name="deliveryType"
          id="deliveryType"
          required
          onChange={handleSelect}
        >
          <option selected disabled>
            Please, select delivery method
          </option>
          {Object.keys(uiToData).map(el => (
            <option key={el}>{el}</option>
          ))}
        </select>
        <ArrowIcon direction="down" />
      </div>
      {(deliveryType.current === DeliveryTypes.DPD ||
        deliveryType.current === DeliveryTypes.UPS) && <DeliveryDetails />}
    </fieldset>
  );
};
