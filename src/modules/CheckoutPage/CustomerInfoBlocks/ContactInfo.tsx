/* eslint-disable max-len */
import classNames from 'classnames';
import { useContext, useEffect, useState } from 'react';
import { CheckoutErrorsContext } from '../../../Store/CheckoutErrorStore';
import { CheckoutContext } from '../../../Store/CheckoutStore';
import { CustomEvents } from '../../../utils/eventEmitters/emitterTypes';
import { sessionStorageEventEmitter } from '../../../utils/eventEmitters/sessionStorageEmitter';
import { ErrorMessage } from '../../shared/ErrorMassages/ErrorMessage';
import { AuthorizationForm } from '../../shared/Shared_Components/Forms/AuthorizationForm/AuthorizationForm';
import { GoogleAuth } from '../../shared/Shared_Components/GoogleAuth/GoogleAuth';
import { FormTypes, SessionStorageCredentials } from '../../shared/Types/types';

export const ContactInfo = () => {
  const { checkoutData, setCheckoutData } = useContext(CheckoutContext);
  const { errors } = useContext(CheckoutErrorsContext);

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
    const handler = event => {
      if (event.detail.key === SessionStorageCredentials.CheckoutCredentials) {
        setCheckoutData(event.detail.value);
      }
    };

    sessionStorageEventEmitter.addEventListener(
      CustomEvents.sessionStorageChange,
      handler,
    );

    return () =>
      sessionStorageEventEmitter.removeEventListener(
        CustomEvents.sessionStorageChange,
        handler,
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="checkout__customer-info">
      <h2 className="title title--h2 checkout__text">Contact information</h2>

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
                },
              )}
            >
              Log In
            </h2>
          </div>

          <div className="checkout__inputs-block">
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
          <button className="checkout__button checkout__button--google">
            Successful
          </button>
        )}
      </div>
    </div>
  );
};
