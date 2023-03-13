export const calculatePrice = (price: number, discount: number) => (
  Math.round(price - price * (discount / 100))
);
