export const getPriceWithDiscount = (price: number, discount: number) => {
  return price - ((price * discount) / 100);
};
