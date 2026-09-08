/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useMemo, useState } from 'react';

interface ErrorsProps {
  contactInfo: boolean;
  deliveryInfo: boolean;
  paymentInfo: boolean;
}

export const CheckoutErrorsContext = createContext({
  errors: {
    contactInfo: false,
    deliveryInfo: false,
    paymentInfo: false,
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setErrors: (_value: ErrorsProps) => {},
});

export const CheckoutErrorsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [errors, setErrors] = useState<ErrorsProps>({
    contactInfo: false,
    deliveryInfo: false,
    paymentInfo: false,
  });

  const value = useMemo(() => ({ errors, setErrors }), [errors]);

  return (
    <CheckoutErrorsContext.Provider value={value}>
      {children}
    </CheckoutErrorsContext.Provider>
  );
};
