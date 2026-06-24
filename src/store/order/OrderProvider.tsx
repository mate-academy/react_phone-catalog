import { useEffect, useReducer, useState } from 'react';
import { createContext } from 'react';
import {
  clearOrder,
  createOrder,
  OrderAction,
  OrderReducer,
  OrderState,
} from './OrderReducer';

type OrderContextType = {
  order: OrderState;
  setOrder: React.Dispatch<OrderAction>;
  isInitialized: boolean;
};

export const OrderContext = createContext<OrderContextType | null>(null);

export const OrderProvider = ({ children }: { children: React.ReactNode }) => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [order, setOrder] = useReducer(OrderReducer, {
    orderId: null,
    expiresAt: null,
  });

  useEffect(() => {
    if (!order.expiresAt) {
      return;
    }

    const interval = setInterval(() => {
      const diff = order.expiresAt! - Date.now();

      if (diff <= 0) {
        clearInterval(interval);

        setOrder(clearOrder());

        localStorage.removeItem('orderId');
        localStorage.removeItem('expiresAt');
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [order.expiresAt]);

  useEffect(() => {
    const savedOrderId = localStorage.getItem('orderId');
    const savedExpiresAt = localStorage.getItem('expiresAt');

    if (savedOrderId && savedExpiresAt) {
      const isExpired = Date.now() > Number(savedExpiresAt);

      if (!isExpired) {
        setOrder(
          createOrder({
            orderId: savedOrderId,
            expiresAt: Number(savedExpiresAt),
          }),
        );
      } else {
        localStorage.removeItem('orderId');
        localStorage.removeItem('expiresAt');
      }
    }

    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (order.orderId && order.expiresAt) {
      localStorage.setItem('orderId', order.orderId);
      localStorage.setItem('expiresAt', order.expiresAt.toString());
    }
  }, [order.orderId, order.expiresAt]);

  return (
    <OrderContext.Provider value={{ order, setOrder, isInitialized }}>
      {children}
    </OrderContext.Provider>
  );
};
