import { calcTotalPrice } from "./calcTotalPrice";

export const getDataFromLS = (key: string) => {
  const data = localStorage.getItem(key);
  const items = data ? JSON.parse(data) : [];
  const totalPrice = calcTotalPrice(items);

  return {
    items,
    totalPrice,
  };
};
