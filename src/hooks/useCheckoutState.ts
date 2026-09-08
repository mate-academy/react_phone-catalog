import { useState, useEffect } from 'react';

export const useCheckoutState = () => {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isCheckoutOpen ? 'hidden' : 'unset';

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isCheckoutOpen]);

  const openCheckout = () => setIsCheckoutOpen(true);
  const closeCheckout = () => setIsCheckoutOpen(false);

  return { isCheckoutOpen, openCheckout, closeCheckout };
};
