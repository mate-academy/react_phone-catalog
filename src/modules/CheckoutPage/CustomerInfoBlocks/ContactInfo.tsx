/* eslint-disable max-len */
import classNames from 'classnames';
import { useContext, useEffect, useState } from 'react';
import { CheckoutErrorsContext } from '../../../Store/CheckoutErrorStore';
import { CheckoutContext } from '../../../Store/CheckoutStore';
import { CustomEvents } from '../../../utils/eventEmitters/emitterTypes';
import { sessionStorageEventEmitter } from '../../../utils/eventEmitters/sessionStorageEmitter';
import { ErrorMessage } from '../../shared/ErrorMessages/ErrorMessage';
import { AuthorizationForm } from '../../shared/Shared_Components/Forms/AuthorizationForm/AuthorizationForm';
import { GoogleAuth } from '../../shared/Shared_Components/GoogleAuth/GoogleAuth';
import { FormTypes, SessionStorageCredentials } from '../../shared/Types/types';
import { PrimaryButton } from '../../shared/Shared_Components/ActionButtons/PrimaryButton';
import { DarkModeContext } from '../../../Store/StoreThemeMode';

export const ContactInfo = () => {
  const { isDark } = useContext(DarkModeContext);
  const { checkoutData, setCheckoutData } = useContext(CheckoutContext);
  const { errors, setErrors } = useContext(CheckoutErrorsContext);

  const signUp = {
    firstName: checkoutData.firstName,
    phone: checkoutData.phone,
  };

  const logIn = {
    email: checkoutData.email,
    password: checkoutData.password,
  };

  const [active, setActive] = useState<FormTypes>(FormTypes.SignUp);

  const onChangeHandler = (key: string, value: string) => {
    setCheckoutData({ ...checkoutData, [key]: value });
  };

  const errorTitle = 'Please, fill in required blanks in the section below!';

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handler = (event: any) => {
      if (event.detail.key === SessionStorageCredentials.CheckoutCredentials) {
        setCheckoutData(event.detail.value);
      }
    };

    sessionStorageEventEmitter.addEventListener(
      CustomEvents.sessionStorageChange,
      handler,
    );

    const timer = setTimeout(() => {
      const newErrors = {
        contactInfo: false,
        deliveryInfo: false,
        paymentInfo: false,
      };

      setErrors(newErrors);
    }, 7000);

    return () => {
      clearTimeout(timer);

      sessionStorageEventEmitter.removeEventListener(
        CustomEvents.sessionStorageChange,
        handler,
      );
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errors]);

  return (
    <div className="checkout__customer-info">
      <h2
        className={classNames('title title--h2 checkout__text', {
          'title--is-Dark': isDark,
        })}
      >
        Contact information
      </h2>

      {errors.contactInfo && <ErrorMessage title={errorTitle} />}

      <div className="checkout__log-in-block">
        <div className="checkout__log-in-info">
          <div className="checkout__log-in-titles">
            <h2
              onClick={() => setActive(FormTypes.SignUp)}
              className={classNames(
                'title title-h4 checkout__text checkout__log-in-title',
                {
                  'checkout__log-in-title--is-not-active':
                    active == FormTypes.LogIn,
                  'title--is-Dark': isDark,
                  'checkout__log-in-title--dark-not-active':
                    isDark && active === FormTypes.LogIn,
                },
              )}
            >
              Sign Up
            </h2>

            <h2
              onClick={() => setActive(FormTypes.LogIn)}
              className={classNames(
                'title title-h4 checkout__text checkout__log-in-title',
                {
                  'checkout__log-in-title--is-not-active':
                    active === FormTypes.SignUp,
                  'title--is-Dark': isDark,
                  'checkout__log-in-title--dark-not-active':
                    isDark && active === FormTypes.SignUp,
                },
              )}
            >
              Log In
            </h2>
          </div>

          <div
            className={classNames('checkout__inputs-block', {
              'checkout__inputs-block--dark': isDark,
            })}
          >
            {active === FormTypes.SignUp && (
              <AuthorizationForm
                formType={FormTypes.SignUp}
                inputValue={signUp}
                setInputValue={onChangeHandler}
              />
            )}

            {active === FormTypes.LogIn && (
              <AuthorizationForm
                formType={FormTypes.LogIn}
                inputValue={logIn}
                setInputValue={onChangeHandler}
              />
            )}
          </div>
        </div>

        {!checkoutData.isLoggedInByGoogle ? (
          <GoogleAuth />
        ) : (
          <PrimaryButton
            title="Successful !"
            onClickHandler={() => {}}
            isDisabled
            width="40%"
          />
        )}
      </div>
    </div>
  );
};
