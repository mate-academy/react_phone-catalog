import { createContext, ReactNode, useEffect, useRef, useState } from 'react';
import { Address, Birthday, UserDetails } from '@shared/api/types/bodies.types';
import { DeliveryTypes, Months } from '@shared/api/types/bodies.enums';
import { createContextHook } from '@shared/helpers';
import { CartData, get } from '@shared/api';
import { useGlobalData } from '@features/index';
import { FormIDs } from '../types';

type CheckoutTypes = {
  userDetails: React.MutableRefObject<UserDetails>;
  deliveryType: React.MutableRefObject<DeliveryTypes>;
  deliveryAddress: React.MutableRefObject<Address>;
  dataProcessingAgreement: React.MutableRefObject<boolean>;
  birthdayRef: React.MutableRefObject<Birthday>;
  cart: string | CartData;
  filled: React.MutableRefObject<Record<FormIDs, boolean>>;
};

type CheckoutStepsType = {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
};

const CheckoutContext = createContext<CheckoutTypes | null>(null);
const CheckoutStepsContext = createContext<CheckoutStepsType | null>(null);

const CheckoutProvider = ({ children }: { children: ReactNode }) => {
  const { itemsInCart } = useGlobalData();
  const [cart, setCart] = useState<string | CartData>('');
  const filled = useRef<Record<FormIDs, boolean>>({
    [FormIDs.DATA]: false,
    [FormIDs.DELIVERY]: false,
    [FormIDs.AGREEMENT]: false,
  });

  const userDetails = useRef<UserDetails>({
    firstName: '',
    lastName: '',
    email: '',
    tel: '',
  });

  const birthdayRef = useRef<Birthday>({
    day: 0,
    month: 0 as Months,
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

  const loadCart = async () => {
    try {
      const res = await get.cart(itemsInCart);

      if (!res.ok) {
        return;
      }

      setCart(res.data);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
  };

  useEffect(() => {
    loadCart();
  }, [itemsInCart]);

  const value = {
    userDetails,
    deliveryType,
    deliveryAddress,
    dataProcessingAgreement,
    birthdayRef,
    cart,
    filled,
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
