import { createContext, ReactNode, useRef, useState } from 'react';
import { Address, Birthday, UserDetails } from '@shared/api/types/bodies.types';
import { DeliveryTypes, Months } from '@shared/api/types/bodies.enums';
import { createContextHook } from '@shared/helpers';

type CheckoutTypes = {
  userDetails: React.MutableRefObject<UserDetails>;
  deliveryType: React.MutableRefObject<DeliveryTypes>;
  deliveryAddress: React.MutableRefObject<Address>;
  dataProcessingAgreement: React.MutableRefObject<boolean>;
  birthdayRef: React.MutableRefObject<Birthday>;
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

  const birthdayRef = useRef<Birthday>({
    day: 0,
    month: '' as Months,
    year: 0,
  } as Birthday);

  const deliveryType = useRef<DeliveryTypes>('' as DeliveryTypes);
  const deliveryAddress = useRef<Address>({
    country: '',
    city: '',
    postalCode: '',
    street: '',
    buildingNumber: '',
    apartment: '',
  });

  const dataProcessingAgreement = useRef(false);

  const value = {
    userDetails,
    deliveryType,
    deliveryAddress,
    dataProcessingAgreement,
    birthdayRef,
  };

  return (
    <CheckoutContext.Provider value={value}>
      {children}
    </CheckoutContext.Provider>
  );
};

type Props = {
  children: ReactNode;
};

const CheckoutStepsProvider = ({ children }: Props) => {
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
