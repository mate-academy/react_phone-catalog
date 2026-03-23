import { useContext } from 'react';
import { OrderContext } from '../store/OrderProvider/OrderProvider';

export const useOrder = () => {
  const context = useContext(OrderContext);

  if (!context) {
    throw new Error('OrderContext must be used within OrderProvider');
  }

  return context;
};
