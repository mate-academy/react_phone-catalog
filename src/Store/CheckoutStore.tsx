import React, { createContext, useMemo } from 'react';
import { useSessionStorage } from '../hooks/UseSessionStorage';
import {
  CheckoutData,
  DeliveryMethod,
  SessionStorageCredentials,
} from '../modules/shared/Types/types';

const defaultValue: CheckoutData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  deliveryMethod: DeliveryMethod.Unset,
  deliveryCity: '',
  deliverTo: '',
  paymentMethod: '',
  password: '',
  isLoggedInByGoogle: false,
  discountInfo: {
    isActive: false,
    code: '',
  },
  buildingDetails: {
    building: '',
    entrance: '',
    apartment: '',
  },
};

export const CheckoutContext = createContext({
  checkoutData: defaultValue,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setCheckoutData: (_newValue: CheckoutData) => {},
});

export const CheckoutProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [checkoutData, setCheckoutData] = useSessionStorage(
    SessionStorageCredentials.CheckoutCredentials,
    defaultValue,
  );

  const value = useMemo(
    () => ({ checkoutData, setCheckoutData }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [checkoutData],
  );

  return (
    <CheckoutContext.Provider value={value}>
      {children}
    </CheckoutContext.Provider>
  );
};
