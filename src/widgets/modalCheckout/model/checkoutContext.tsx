import { createContext, ReactNode, useRef, useState } from 'react';
import { Pickup, Shipment, UserDetails } from '@shared/api/types/bodies.types';
import { DeliveryTypes } from '@shared/api/types/bodies.enums';
import { createContextHook } from '@shared/helpers';

type CheckoutTypes = {
  userDetails: React.MutableRefObject<UserDetails>;
  deliveryDetails: React.MutableRefObject<Pickup | Shipment>;
  dataProcessingAgreement: React.MutableRefObject<boolean>;
};

type CheckoutStepsType = {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
};

const CheckoutContext = createContext<CheckoutTypes | null>(null);
const CheckoutStepsContext = createContext<CheckoutStepsType | null>(null);

const CheckoutProvider = ({ children }: { children: ReactNode }) => {
  const userDetails = useRef<UserDetails>({
    firstName: '',
    lastName: '',
    email: '',
    tel: '',
    birthday: undefined,
  });

  const deliveryDetails = useRef<Shipment | Pickup>({
    type: '' as DeliveryTypes,
    deliveryAddress: {
      country: '',
      city: '',
      postalCode: 0,
      street: '',
      buildingNumber: '',
      apartment: undefined,
    },
  });

  const dataProcessingAgreement = useRef(false);

  const value = { userDetails, deliveryDetails, dataProcessingAgreement };

  return (
    <CheckoutContext.Provider value={value}>
      {children}
    </CheckoutContext.Provider>
  );
};

const CheckoutStepsProvider = ({ children }: { children: ReactNode }) => {
  const [step, setStep] = useState<number>(1);

  const value = { step, setStep };

  return (
    <CheckoutStepsContext.Provider value={value}>
      {children}
    </CheckoutStepsContext.Provider>
  );
};

const useSteps = createContextHook(CheckoutStepsContext);

const useCheckout = createContextHook(CheckoutContext);

export { useCheckout, CheckoutProvider, useSteps, CheckoutStepsProvider };
