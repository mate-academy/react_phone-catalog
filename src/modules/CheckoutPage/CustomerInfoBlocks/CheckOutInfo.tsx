/* eslint-disable max-len */
import { useContext, useEffect, useState } from 'react';
import { RadioInput } from '../../shared/Shared_Components/InputFields/RadioInput/RadioInput';
import { UserPaymentOptions } from '../../shared/Types/types';
import { getPaymentOptions } from '../../../api/getPaymentOptions';
import { CheckoutContext } from '../../../Store/CheckoutStore';
import { ErrorMessage } from '../../shared/ErrorMassages/ErrorMessage';
import { CheckoutErrorsContext } from '../../../Store/CheckoutErrorStore';

export const CheckoutInfo = () => {
  const [options, setOptions] = useState<UserPaymentOptions[]>([]);
  const { checkoutData, setCheckoutData } = useContext(CheckoutContext);
  const { errors } = useContext(CheckoutErrorsContext);

  const onCheckHandler = (
    arr: UserPaymentOptions[],
    val: UserPaymentOptions,
  ) => {
    setCheckoutData({ ...checkoutData, paymentMethod: val.paymentTitle });

    setOptions(arr);
  };

  const errorTitle = 'Please, select payment method!';

  useEffect(() => {
    getPaymentOptions().then(data => {
      const newList: UserPaymentOptions[] = data.map(item => {
        return { ...item, isChecked: false };
      });

      setOptions(newList);
    });
  }, []);

  return (
    <div className="checkout__customer-info">
      <h2 className="title title--h2 checkout__text">Check Out</h2>

      {errors.paymentInfo && <ErrorMessage title={errorTitle} />}

      <div className="checkout__payment-options">
        {options?.map(item => (
          <RadioInput
            key={item.paymentId}
            data={item}
            listOfOptions={options}
            onCheck={onCheckHandler}
          />
        ))}
      </div>
    </div>
  );
};
