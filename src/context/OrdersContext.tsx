import { createContext, useContext } from 'react';
import { useItemIds } from '../hooks/useItemIds';

type OrdersContextType = {
  orders: string[];
  quantities: Record<string, number>;
  totalCount: number;
  addOrder: (itemId: string) => void;
  removeOrder: (itemId: string) => void;
  setQuantity: (itemId: string, quantity: number) => void;
  clearOrders: () => void;
};

const OrdersContext = createContext<OrdersContextType | null>(null);

export const OrdersProvider = ({ children }: { children: React.ReactNode }) => {
  const {
    itemIds: orders,
    quantities,
    totalCount,
    addItem,
    removeItem,
    setQuantity,
    clearItems,
  } = useItemIds('orders');

  return (
    <OrdersContext.Provider
      value={{
        orders,
        quantities,
        totalCount,
        addOrder: addItem,
        removeOrder: removeItem,
        setQuantity,
        clearOrders: clearItems,
      }}
    >
      {children}
    </OrdersContext.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(OrdersContext);

  if (!context) {
    throw new Error('useOrders must be used inside OrdersProvider');
  }

  return context;
};
