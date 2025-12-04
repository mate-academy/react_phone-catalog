import { ArrowIcon } from '@shared/icons';
import styles from './deliveryForm.module.scss';
import { useCheckout, useSteps } from '@widgets/modalCheckout/model';
import { DeliveryTypes } from '@shared/api/types/bodies.enums';
import { DeliveryDetails } from './deliveryDetails/DeliveryDetails';
import { FormIDs } from '@widgets/modalCheckout/types';
import { useReducer } from 'react';

export const DeliveryForm = () => {
  const { deliveryType, filled } = useCheckout();
  const { step, setStep } = useSteps();
  const [, forceUpdate] = useReducer(x => x + 1, 0);

  const uiToData: Record<string, DeliveryTypes> = {
    'In store pickup': DeliveryTypes.PICKUP,
    'DPD express': DeliveryTypes.DPD,
    'UPS standart': DeliveryTypes.UPS,
  };

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    deliveryType.current = uiToData[e.target.value];
    forceUpdate();
  };

  return (
    <form
      id={FormIDs.DELIVERY}
      onSubmit={e => {
        e.preventDefault();
        filled.current[FormIDs.DELIVERY] = true;
        setStep(step + 1);
      }}
    >
      <fieldset className={styles['form-container']}>
        <legend className={styles.heading}>shipping details</legend>
        <label htmlFor="deliveryType">delivery method *</label>
        <div className={styles['select-wrapper']}>
          <select
            name="deliveryType"
            id="deliveryType"
            required
            onChange={handleSelect}
          >
            <option selected disabled value="">
              Please, select delivery method
            </option>
            {Object.keys(uiToData).map(el => (
              <option key={el}>{el}</option>
            ))}
          </select>
          <ArrowIcon direction="down" />
        </div>
        {(deliveryType.current === DeliveryTypes.UPS ||
          deliveryType.current === DeliveryTypes.DPD) && <DeliveryDetails />}
      </fieldset>
    </form>
  );
};
