/* eslint-disable max-len */
import { useContext, useEffect, useState } from 'react';
import { RadioInput } from '../../shared/Shared_Components/InputFields/RadioInput/RadioInput';
import { UserPaymentOptions } from '../../shared/Types/types';
import { getPaymentOptions } from '../../../api/getPaymentOptions';
import { CheckoutContext } from '../../../Store/CheckoutStore';
import { ErrorMessage } from '../../shared/ErrorMessages/ErrorMessage';
import { CheckoutErrorsContext } from '../../../Store/CheckoutErrorStore';
import { DarkModeContext } from '../../../Store/StoreThemeMode';
import classNames from 'classnames';

export const CheckoutInfo = () => {
  const [options, setOptions] = useState<UserPaymentOptions[]>([]);
  const { checkoutData, setCheckoutData } = useContext(CheckoutContext);
  const { errors } = useContext(CheckoutErrorsContext);
  const { isDark } = useContext(DarkModeContext);

  const onSelectHandler = (
    arr: UserPaymentOptions[],
    val: UserPaymentOptions,
  ) => {
    const newList = arr.map(item => {
      return item.paymentId === val.paymentId
        ? { ...item, isChecked: true }
        : { ...item, isChecked: false };
    });

    return () => {
      setCheckoutData({ ...checkoutData, paymentMethod: val.paymentTitle });
      setOptions(newList);
    };
  };

  const errorTitle = 'Please, select payment method!';

  useEffect(() => {
    getPaymentOptions().then(data => {
      const newList: UserPaymentOptions[] = data.map(item => {
        if (checkoutData.paymentMethod === item.paymentTitle) {
          return { ...item, isChecked: true };
        }

        return { ...item, isChecked: false };
      });

      setOptions(newList);
    });
  }, [checkoutData.paymentMethod]);

  return (
    <div className="checkout__customer-info">
      <h2
        className={classNames('title title--h2 checkout__text', {
          'title--is-Dark': isDark,
        })}
      >
        Check Out
      </h2>

      {errors.paymentInfo && <ErrorMessage title={errorTitle} />}

      <div className="checkout__payment-options">
        {options?.map(item => (
          <RadioInput
            key={item.paymentId}
            data={item}
            onSelectHandler={onSelectHandler(options, item)}
          />
        ))}
      </div>
    </div>
  );
};
